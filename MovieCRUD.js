const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://coetYing:jingting1104@cluster0-0jyct.mongodb.net/test?retryWrites=true&w=majority";

var sCluster = "";
var sCollection = "";

module.exports = {
    estCon: (cluster, collection) => {
        sCluster = cluster;
        sCollection = collection;
    },
    selQuery: sQuery => {
        //Remember that we have to wait for the result to come back from the database -
        //To do this we have to setup here our promise chain
        return new Promise((resolve) => {
            const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
            client.connect(err => {
                if (err) throw err;
                const collection = client.db(sCluster).collection(sCollection);

                collection.find(sQuery).toArray().then(documents => {
                    resolve(documents);
                    client.close();
                }).catch(err => console.log(err));
            })
        })

    },
    updateQuery: (sSelection, sUpdate) => {
        return new Promise((resolve) => {
            const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
            client.connect(err => {
                if (err) throw err;
                const collection = client.db(sCluster).collection(sCollection);
                let updateStatement = { $set: sUpdate };
                collection.updateOne(sSelection, updateStatement).then(result => {
                    resolve(result);
                    client.close();
                }).catch(err => console.log(err));
            })
        })
    },

    insertQuery: (inStateMent) => {
        return new Promise((resolve) => {
            const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
            client.connect(err => {
                if (err) throw err;
                const collection = client.db(sCluster).collection(sCollection);

                collection.insertOne(inStateMent).then(result => {
                    resolve("Movie is saved ");
                    client.close();
                }).catch(err => console.log(err));
            })
        })
    },
    delQuery: (delStateMent) => {
        return new Promise((resolve) => {
            const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
            client.connect(err => {
                if (err) throw err;
                const collection = client.db(sCluster).collection(sCollection);

                collection.deleteOne(delStateMent).then(result => {
                    resolve("Delete is successful " + result.deletedCount);
                    client.close();
                }).catch(err => console.log(err));
            })
        })
    },

};


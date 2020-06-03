'use strict';

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://coetYing:jingting1104@cluster0-0jyct.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
    if (err) throw err;

    const collection = client.db("coet").collection("movie");

    console.log("Connection to remoted database worked");
    client.close();
})

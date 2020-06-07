"use strict";
var obExpress = require("express");
var PORT = 3000;

var app = obExpress();

const myCRUD = require("./MovieCRUD");
const selQuery = myCRUD.selQuery;
const insertQuery = myCRUD.insertQuery;
const obPath = require("path");
const updateQuery = myCRUD.updateQuery;


app.get("/actors", (req, res) => {
    const conDBActors = myCRUD.estCon;
    conDBActors("coet", "Actors");
    selQuery({}).then(data => {
        res.send(data);
    })

});

app.get("/html/:file", (req, res) => {
    let sFile = obPath.join(__dirname + "/HTML/" + req.params.file)
    res.sendFile(sFile);
})

const bodyParser = require("body-parser");

///** bodyParser.urlencoded(options)
// * Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST)
// * and exposes the resulting object (containing the keys and values) on req.body
// */
app.use(bodyParser.urlencoded({
    extended: true
}));

/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
app.use(bodyParser.json());

app.post("/movies", (req, res) => {
    const conDBMovies = myCRUD.estCon("coet", "Movies");
    insertQuery(req.body).then(data => {
        res.send(data);
    })
})

app.get("/movies", (req, res) => {
    const conDBMovies = myCRUD.estCon("coet", "Movies");
    selQuery({ $or: [{ Actor: req.query.name }, { Actress: req.query.name }] }).then(data => {
        res.send(data);
    })
})

app.get("/movielist", (req, res) => {
    const conDBMovies = myCRUD.estCon("coet", "Movies");
    selQuery({}).then(data => {
        res.send(data);
    })
})

app.get("/movie", (req, res) => {
    const conDBMovies = myCRUD.estCon("coet", "Movies");
    selQuery( req.query ).then(data => {

        res.send(data);
    })
})

app.post("/actors", (req, res) => {
    const conDBActors = myCRUD.estCon;
    conDBActors("coet", "Actors");
    insertQuery(req.body).then(data => {
        res.send(data);
    })
})

app.put("/movies", (req, res) => {
    const conDBMovies = myCRUD.estCon("coet", "Movies");
    let rate = parseInt(req.body.ratings, 10);
    console.log(rate);
    updateQuery({ Movie: req.body.movie }, { Ratings:rate }).then((data) => {

        res.send(data);
    })
})

app.listen(PORT, () => console.log("Acess to Actors listening on Port" + PORT));


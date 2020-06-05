"use strict";
var obExpress = require("express");
var PORT = 3000;

var app = obExpress();

const myCRUD = require("./MovieCRUD");
const selQuery = myCRUD.selQuery;
const insertQuery = myCRUD.insertQuery;
const obPath = require("path");



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
    console.log(req.query);
    selQuery({ $or: [{ Actor: req.query.name }, { Actress: req.query.name }] }).then(data => {
        res.send(data);
    })
})


app.listen(PORT, () => console.log("Acess to Actors listening on Port" + PORT));


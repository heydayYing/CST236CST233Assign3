"use strict";
var obExpress = require("express");
var PORT = 3001;

var app = obExpress();

const myCRUD = require("./MovieCRUD");
const insertQuery = myCRUD.insertQuery;
const conDBMovies = myCRUD.estCon("coet", "Movies");
const obPath = require("path");

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
    console.log(req);
    insertQuery(req.body).then(data => {
        res.send(data);
       
    })
})



app.listen(PORT, () => console.log("Assignment listening on Port" + PORT));

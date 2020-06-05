"use strict";
var obExpress = require("express");
var PORT = 3000;

var app = obExpress();

const myCRUD = require("./MovieCRUD");
const selQuery = myCRUD.selQuery;
const obPath = require("path");

const conDBActors = myCRUD.estCon;
conDBActors("coet", "Actors");

app.get("/actors", (req, res) => {

    selQuery({}).then(data => {
        res.send(data);
    })

});

app.get("/html/:file", (req, res) => {
    let sFile = obPath.join(__dirname + "/HTML/" + req.params.file)
    res.sendFile(sFile);
})

app.listen(PORT, () => console.log("Acess to Actors listening on Port" + PORT));


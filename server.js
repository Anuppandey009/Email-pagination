
const express = require(`express`)
const connect = require("./configs/db.js")
const app = require("./index")



app.listen(2345, async function () {
    await connect()
    console.log("Listen on port 2345");
})
const express = require("express");
const dotenv = require("dotenv").config();

const app = express();

app.get("/home", (req, res) => {
    res.status(200).json({"msg":"HOME PAGE"});
})

app.listen(process.env.PORT || 3000, () => {console.log(`listening on port: ${process.env.PORT}`)})
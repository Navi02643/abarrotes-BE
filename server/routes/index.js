const express = require("express");
const app = express();

app.use("/login", require("./sessions"));
app.use("/register", require("./user"))

module.exports = app;
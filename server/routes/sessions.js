const express = require("express");
const app = express();

const { login } = require("../services/index");
const { validateLoginData, validLogin, isUserActive } = require("../middleware/index");

app.post("/", validateLoginData, validLogin, isUserActive, async (req, res) => {
  try {
    const { email, phoneNumber } = req.body;
    const data = await login(email,phoneNumber);
    return res.status(200).send({
      isValid: data.isValid,
      message: data.message,
      data: data.data,
    });
  } catch (error) {
    return res.status(500).send({
      isValid: false,
      message: "something failed, try again later",
      data: null,
    });
  }
});

module.exports = app;

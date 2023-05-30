const express = require("express");
const app = express();

const { registerUser } = require('../services/index')
const { validateRegisterData, findUserByEmail } = require('../middleware/index')

app.post("/", validateRegisterData, findUserByEmail, async (req, res) => {
  try {
    const { name, middlename, lastname, email, password, phoneNumber } = req.body;
    const data = await registerUser({ name, middlename, lastname, email, password, phoneNumber });
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

const Joi = require("joi");
const bcrypt = require("bcrypt");

const { findByEmail, findByPhoneNumber } = require("../db/index");

const validateLoginData = (req, res, next) => {
  const { email, phoneNumber, password } = req.body;

  const Schema = Joi.object({
    email: Joi.string().email(),
    phoneNumber: Joi.number(),
    password: Joi.string().required(),
  })
    .or("email", "phoneNumber")
    .required()
    .messages({
      "object.missing": "Se requiere el correo o un numero de telefono",
    });

  const { error } = Schema.validate({ email, phoneNumber, password });

  if (error) {
    const message = error.details[0].message.replace(/"/g, "");
    return res.status(400).send({ isValid: false, message, data: null });
  }

  next();
};

const validLogin = async (req, res, next) => {
  const { email, phoneNumber, password } = req.body;
  let user = await findByEmail(email);
  if (!user) {
    user = await findByPhoneNumber(phoneNumber);
    if (!user) {
      return res.status(401).send({
        isValid: false,
        message: "Correo/telefono o contraseña invalidos",
        data: null,
      });
    }
  }
  const isCorrectPassword = await bcrypt.compare(password, user.password);
  if (!isCorrectPassword) {
    return res.status(401).send({
      isValid: false,
      message: "Correo/telefono o contraseña invalidos",
      data: null,
    });
  }
  next();
};

const isUserActive = async (req, res, next) => {
  const { email, phoneNumber } = req.body;
  let user = await findByEmail(email);
  if (!user) {
    user = await findByPhoneNumber(phoneNumber)
    if(!user){
      return res.status(401).send({
        isValid: false,
        message: "Correo/telefono o contraseña invalidos",
        data: null,
      });
    }
  }
  if (!user.isActive) {
    return res.status(403).send({
      isValid: false,
      message: "El usuario se encuentra inactivo",
      data: null,
    });
  }
  next();
};

module.exports = {
  validateLoginData,
  validLogin,
  isUserActive,
};

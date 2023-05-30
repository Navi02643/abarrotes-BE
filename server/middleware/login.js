const Joi = require("joi");
const bcrypt = require("bcrypt");

const { findByEmail } = require("../db/index");

const validateLoginData = (req, res, next) => {
  const { email, password } = req.body;

  const Schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  });

  const { error } = Schema.validate({ email, password });

  if (error) {
    const message = error.details[0].message.replace(/"/g, "");
    return res.status(400).send({ isValid: false, message, data: null });
  }

  next();
};

const validLogin = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await findByEmail(email);
  if (!user) {
    return res
      .status(401)
      .send({
        isValid: false,
        message: "Correo o contraseña invalidos",
        data: null,
      });
  }
  const isCorrectPassword = await bcrypt.compare(password, user.password);
  if (!isCorrectPassword) {
    return res
      .status(401)
      .send({
        isValid: false,
        message: "Correo o contraseña invalidos",
        data: null,
      });
  }
  next();
};

const isUserActive = async (req, res, next) => {
  const { email } = req.body;
  const user = await findByEmail(email);
  if (!user) {
    return res
      .status(401)
      .send({
        isValid: false,
        message: "Correo o contraseña invalidos",
        data: null,
      });
  }
  if(!user.isActive){
    return res
      .status(403)
      .send({
        isValid: false,
        message: "El usuario se encuentra inactivo",
        data: null,
      });
  }
  next()
}

module.exports = {
  validateLoginData,
  validLogin,
  isUserActive,
};

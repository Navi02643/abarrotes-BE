const Joi = require("joi");

const { findByEmail } = require("../db/index");

const validateRegisterData = (req, res, next) => {
  const { name, middlename, lastname, email, password, phoneNumber } = req.body;

  const Schema = Joi.object({
    name: Joi.string()
      .regex(/^[a-zA-Z\s]+$/)
      .required()
      .messages({
        "string.pattern.base": "Solo se permiten letras para el nombre",
        "string.empty": "El nombre es obligatorio",
      }),
    middlename: Joi.string()
      .allow("")
      .regex(/^[a-zA-Z\s]+$/)
      .optional()
      .messages({
        "string.pattern.base": "Solo se permiten letras en los apellidos",
      }),
    lastname: Joi.string()
      .regex(/^[a-zA-Z\s]+$/)
      .required()
      .messages({
        "string.pattern.base": "Solo se permiten letras en los apellidos",
        "string.empty": "El apellido es obligatorio",
      }),
    email: Joi.string().email(),
    password: Joi.string()
      .required()
      .min(8)
      .max(20)
      .custom((value, helpers) => {
        if (!/(?=.*[a-z])/.test(value)) {
          return helpers.message(
            "La contraseña debe contener al menos una letra minúscula."
          );
        }
        if (!/(?=.*[A-Z])/.test(value)) {
          return helpers.message(
            "La contraseña debe contener al menos una letra mayúscula."
          );
        }
        if (!/(?=.*[!@#$%^&*()\\.])/.test(value)) {
          return helpers.message(
            "La contraseña debe contener al menos un carácter especial."
          );
        }
        if (!/(?=.*\d)/.test(value)) {
          return helpers.message(
            "La contraseña debe contener al menos un número."
          );
        }
        return value;
      })
      .messages({
        "string.empty": "La contraseña es un campo obligatorio.",
        "string.min": "La contraseña debe tener al menos {#limit} caracteres.",
        "string.max": "La contraseña no debe exceder los {#limit} caracteres.",
      }),
    phoneNumber: Joi.number().integer().optional(),
  })
    .or("email", "phoneNumber")
    .required()
    .messages({
      "object.missing": "Se requiere el correo o un numero de telefono",
    });

  const { error } = Schema.validate({
    name,
    middlename,
    lastname,
    email,
    password,
    phoneNumber,
  });

  if (error) {
    const message = error.details[0].message.replace(/"/g, "");
    return res.status(400).send({ isValid: false, message, data: null });
  }

  next();
};

const findUserByEmail = async (req, res, next) => {
  const { email } = req.body;
  const existUser = await findByEmail(email);
  if (existUser) {
    return res
      .status(409)
      .send({ isValid: false, message: "Correo ya registrado", data: null });
  }
  next();
};

module.exports = {
  validateRegisterData,
  findUserByEmail,
};

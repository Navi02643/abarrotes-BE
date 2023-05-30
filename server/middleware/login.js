const Joi = require("joi");

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

module.exports = validateLoginData;

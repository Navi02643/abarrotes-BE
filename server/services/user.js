const bcrypt = require("bcrypt");

const { UserModel } = require("../models/DTA/index");
const { saveUser } = require("../db/index");

const registerUser = async ({ name, middlename, lastname, email, password, phoneNumber }) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new UserModel({ name, middlename, lastname, email, password: hashedPassword, phoneNumber });
  const user = await saveUser(newUser);
  return {
    isValid: true,
    message: "Se registro al usuario con exito",
    data: user,
  };
};

module.exports = {
  registerUser,
};

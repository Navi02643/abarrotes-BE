const validateLoginData = require("./login");
const { validateRegisterData, findUserByEmail } = require("./userRegister");

module.exports = {
  validateLoginData,
  validateRegisterData,
  findUserByEmail,
};

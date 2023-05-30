const { UserModel } = require("../models/DTA/index");

const saveUser = async (user) => {
  const newUser = await user.save();
  return newUser;
};

const findByEmail = async (email) => {
  const user = await UserModel.findOne({ email });
  return user;
};

const findByPhoneNumber = async (phoneNumber) => {
  const user = await UserModel.findOne({ phoneNumber });
  return user;
};

module.exports = {
  saveUser,
  findByEmail,
  findByPhoneNumber,
};

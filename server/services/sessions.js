const jwt = require("jsonwebtoken");

const { findByEmail, saveToken, findByPhoneNumber } = require("../db/index");
const { userDTO, mapperToken, userLoginDTO } = require("../models/DTO/index");
const { TokenModel } = require("../models/DTA/index");

const config = require("../config/tokenConfig.json");

const generateToken = async (userDTOFilter) => {
  const userDataToken = {
    id: userDTOFilter.id,
    fullname: userDTOFilter.fullname,
    email: userDTOFilter.email,
  };
  const token = jwt.sign(userDataToken, config.secret, {
    expiresIn: config.tokenLife,
  });
  const refreshtoken = jwt.sign(userDataToken, config.refreshTokenSecret);
  const newTokens = new TokenModel({ token, refreshtoken });
  const tokens = await saveToken(newTokens);
  return tokens;
};

const login = async (email, phoneNumber) => {
  let user = await findByEmail(email);
  if(!user) {
    user = await findByPhoneNumber(phoneNumber)
  }
  const userDTOFilter = userDTO(user);
  const tokens = await generateToken(userDTOFilter);
  const tokenfilter = mapperToken(tokens)
  const data = userLoginDTO(userDTOFilter, tokenfilter)
  return {isValid: true, message:"Sesion iniciada con exito", data}
};

module.exports = {
  login,
};

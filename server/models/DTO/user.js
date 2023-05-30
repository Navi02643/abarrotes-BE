const _ = require("lodash");

const userDTO = (user) => {
  const newUser = _.pick(user, [
    "_id",
    "name",
    "middlename",
    "lastname",
    "email",
    "phoneNumber",
    "isActive",
  ]);
  newUser.id = newUser._id.toString();
  newUser.fullname = `${newUser.name}${
    newUser.middlename ? " " + newUser.middlename : ""
  } ${newUser.lastname}`;
  delete newUser._id;
  delete newUser.name;
  delete newUser.lastname;
  delete newUser.middlename;
  return newUser;
};

const userLoginDTO = (user, token) => {
  const mappedUser = _.pick(user, ['email', 'phoneNumber', 'isActive', 'id', 'fullname']);
  mappedUser.idUser = mappedUser.id
  delete mappedUser.id
  const mappedToken = _.pick(token, ['token', 'refreshtoken', 'id']);
  mappedToken.idToken = mappedToken.id
  delete mappedToken.id
  return {
    ...mappedUser,
    ...mappedToken,
  };
}

module.exports = {
  userDTO,
  userLoginDTO
};

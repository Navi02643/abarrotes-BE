const _ = require("lodash");

const mapperToken = (tokens) => {
  const newToken = _.pick(tokens, ["_id", "token", "refreshtoken"]);
  newToken.id = (newToken._id).toString()
  delete newToken._id
  return newToken
};

module.exports = {
  mapperToken
};

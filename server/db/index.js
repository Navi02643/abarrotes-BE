const { saveUser, findByEmail, findByPhoneNumber } = require('./user')
const { saveToken } = require('./sessions')

module.exports = {
    saveUser,
    findByEmail,
    saveToken,
    findByPhoneNumber
}
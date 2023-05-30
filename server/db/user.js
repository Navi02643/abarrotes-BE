const { UserModel } = require('../models/DTA/index')

const saveUser = async (user) => {
    const newUser = await user.save()
    return newUser
}

const findByEmail = async (email) => {
    const user = await UserModel.findOne({email});
    return user
}

module.exports = {
    saveUser,
    findByEmail
}
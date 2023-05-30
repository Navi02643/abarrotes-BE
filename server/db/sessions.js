const { TokenModel } = require('../models/DTA/index')

const saveToken = async (tokens) => {
    const token = await tokens.save()
    return token
}

module.exports = {
    saveToken
}
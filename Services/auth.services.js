const User = require('../Models/auth.models');

const checkUser = (email) => {
    return User.findOne({email})
}

const createUser = (newUser) => {
    console.log("services", newUser)
    return newUser.save()
}

const UserServices = {
    createUser,
    checkUser
}

module.exports = UserServices;
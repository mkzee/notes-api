const Users = require('../models/users')
const asyncWrapper = require("../utils/async")
const jwt = require('jsonwebtoken')


const getAllUsers = asyncWrapper(async (req, res) => {
    const users = await Users.find({})
    res.status(200).json({users})
})

const signup = asyncWrapper(async (req, res) => {
    const newUser = await Users.create(req.body);

    // signin user once user account is created using jwt(payload, secretString, options)
    const token = jwt.sign({id: newUser._id}, process.env.SECRET_STR, {
        expiresIn: process.env.LOGIN_EXPIRES
    })

    res.status(200).json({
        status: 'Success',
        token,
        data: {
            user: newUser
        }
    }) 
})

module.exports = {
    getAllUsers,
    signup
}
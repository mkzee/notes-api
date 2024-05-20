const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')



const userSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: [true, 'Please enter you name']
    },
    email: {
        type: String,
        required: [true, 'Please enter your email address'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please enter a valid email address']
    },
    photo: String,
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters']
    },
    confirmPassword: {
        type: String,
        required: [true, 'Please confirm password'],
        validate: {
            validator: function (val) {
                return val == this.password
            },
            message: 'Password and confirm password does not match'
        }
    }
})

//encrypt password before saving it using the mongoose pre save middleware
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()

    //encrypt the password
    this.password = await bcrypt.hash(this.password, 12);
    this.confirmPassword = undefined;
    next()
})


const Users = mongoose.model('User', userSchema)

module.exports = Users
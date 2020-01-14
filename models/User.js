const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    roleId:{
        type: Number,
        ref: 'roles'
    },
    refreshToken:{
        type: String
    }
})

module.exports = mongoose.model('users',userSchema)
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const specialtySchema = new Schema({
    title: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('specialties',specialtySchema)
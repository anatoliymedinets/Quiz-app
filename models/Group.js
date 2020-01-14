const mongoose = require('mongoose')
const Schema = mongoose.Schema

const groupSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    courseId:{
        type: Schema.Types.ObjectId,
        ref: 'courses'
    },
    specialtyId:{
        type: Schema.Types.ObjectId,
        ref: 'specialties'
    }
})

module.exports = mongoose.model('groups',groupSchema)
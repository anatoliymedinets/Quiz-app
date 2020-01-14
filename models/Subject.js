const mongoose = require('mongoose')
const Schema = mongoose.Schema

const subjectSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    teacherId:{
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
})

module.exports = mongoose.model('subjects',subjectSchema)
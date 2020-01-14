const mongoose = require('mongoose')
const Schema = mongoose.Schema

const themeSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    subjectId:{
        type: Schema.Types.ObjectId,
        ref: 'subjects'
    },
    courseId:{
        type: Schema.Types.ObjectId,
        ref: 'courses'
    },
})

module.exports = mongoose.model('themes',themeSchema)
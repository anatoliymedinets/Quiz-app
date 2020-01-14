const mongoose = require('mongoose')
const Schema = mongoose.Schema

const planningSchema = new Schema({
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
    specialtyId:{
        type: Schema.Types.ObjectId,
        ref: 'specialties'
    }
})

module.exports = mongoose.model('planings',planningSchema)
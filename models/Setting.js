const mongoose = require('mongoose')
const Schema = mongoose.Schema

const settingSchema = new Schema({
    teacherKey: {
      type: String,
      required: true,
    },
    studentKey: {
      type: String,
      required: true,
    }     
})

module.exports = mongoose.model('settings',settingSchema)
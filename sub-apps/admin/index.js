const express = require('express')
const admin = express()

const courseRouter = require('./routes/course')
const specialtyRouter = require('./routes/specialty')
const groupRouter = require('./routes/group')
const settingRouter = require('./routes/setting')

admin.use('/course', courseRouter)
admin.use('/specialty', specialtyRouter)
admin.use('/group', groupRouter)
admin.use('/setting', settingRouter)

// admin.on('mount', () => {
//   console.log('admin mounted')
// })

module.exports = admin
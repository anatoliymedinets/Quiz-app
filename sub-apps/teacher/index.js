const express = require('express')
const teacher = express()

const subjectRouter = require('./routes/subject')
const planningRouter = require('./routes/planning')
const themeRouter = require('./routes/theme')
const courseRouter = require('./routes/course')
const specialtyRouter = require('./routes/specialty')

teacher.use('/subject', subjectRouter)
teacher.use('/planning', planningRouter)
teacher.use('/theme', themeRouter)

teacher.use('/course', courseRouter)
teacher.use('/specialty', specialtyRouter)


// teacher.on('mount', () => {
//   console.log('teacher mounted')
// })

module.exports = teacher
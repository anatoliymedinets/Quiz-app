const express = require('express')
const router = express.Router()
const controller = require('../controllers/theme')

router.get('/:subjectId/:courseId', controller.getByTeacher)
router.get('/:id', controller.getById)
router.post('/', controller.create)


module.exports = router
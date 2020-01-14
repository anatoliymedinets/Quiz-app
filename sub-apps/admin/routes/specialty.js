const express = require('express')
const router = express.Router()

const controller = require('../controllers/specialty')

router.get('/',controller.getAll)
router.get('/:id',controller.getById)
router.post('/', controller.create)
router.put('/', controller.update)
router.delete('/:id', controller.remove)

module.exports = router
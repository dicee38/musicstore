const express = require('express')
const router = express.Router()
const recordController = require('../controllers/recordController')

router.get('/', recordController.getAllRecords)
router.get('/:id', recordController.getRecordById)
router.post('/', recordController.createRecord)
router.put('/:id', recordController.updateRecord)
router.delete('/:id', recordController.deleteRecord)

module.exports = router

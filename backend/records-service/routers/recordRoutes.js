const express = require('express');
const router = express.Router();
const recordController = require('../controllers/recordController');

// GET all records
router.get('/', recordController.getAllRecords);

// GET a specific record by ID
router.get('/:id', recordController.getRecordById);

// POST a new record
router.post('/', recordController.createRecord);

// PUT update existing record
router.put('/:id', recordController.updateRecord);

// DELETE a record by ID
router.delete('/:id', recordController.deleteRecord);

module.exports = router;

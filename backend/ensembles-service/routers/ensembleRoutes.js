const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/ensembleController');

router.get('/', ctrl.getAllEnsembles);
router.get('/:id', ctrl.getEnsembleById);
router.post('/', ctrl.createEnsemble);
router.put('/:id', ctrl.updateEnsemble);
router.delete('/:id', ctrl.deleteEnsemble);

module.exports = router;

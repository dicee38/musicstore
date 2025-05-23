const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/ensembleController');
const musicianCtrl = require('../controllers/musicianController');

// 🎸 Musician Routes — должны быть ПЕРЕД /:id
router.post('/musicians', musicianCtrl.createMusician);
router.get('/musicians', musicianCtrl.getAllMusicians);
router.get('/musicians/:id', musicianCtrl.getMusicianById);
router.put('/musicians/:id', musicianCtrl.updateMusician);
router.delete('/musicians/:id', musicianCtrl.deleteMusician);

// 🎼 Ensemble Routes
router.get('/', ctrl.getAllEnsembles);
router.get('/:id', ctrl.getEnsembleById);
router.post('/', ctrl.createEnsemble);
router.put('/:id', ctrl.updateEnsemble);
router.delete('/:id', ctrl.deleteEnsemble);

module.exports = router;

const express = require('express');
const router = express.Router();
const personnelController = require('../controllers/personnelController');
const Personnel = require('../models/personnel.model');

// CRUD
router.post('/', personnelController.createPersonnel);
router.get('/', personnelController.getAllPersonnel);
router.get('/:id', personnelController.getPersonnelById);
router.put('/:id', personnelController.updatePersonnel);
router.delete('/:id', personnelController.deletePersonnel);

module.exports = router;
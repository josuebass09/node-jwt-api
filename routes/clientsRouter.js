const express = require('express');
const router = express.Router();
const { postClient, getClientById, putClient, deleteClient, getClientByEmailOrGetAll } = require('../services/clientService');

router.post('/', postClient);
router.get('/:id', getClientById);
router.get('/', getClientByEmailOrGetAll);
router.put('/:id', putClient);
router.delete('/:id', deleteClient);

module.exports = router;


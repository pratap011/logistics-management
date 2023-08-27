const express = require('express');
const itemsController = require('../controllers/itemsController.js');
const authentication = require('../utils/authentication');

const router = express.Router();

// Get all items
router.get('/', itemsController.getItems);

// Create a new item
router.post('/', itemsController.createItems);

// Update an item
router.put('/:itemId', itemsController.updateItem);

module.exports = router;

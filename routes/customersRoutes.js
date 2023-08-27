const express = require('express');
const customersController = require('../controllers/customersController');
const authentication = require('../utils/authentication');

const router = express.Router();

// Create a new customer
router.post('/', customersController.registerCustomer);

// Update a customer
router.put('/:customerId', customersController.updateCustomer);

module.exports = router;

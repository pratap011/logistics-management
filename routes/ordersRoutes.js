const express = require('express');
const ordersController = require('../controllers/ordersController');
const authentication = require('../utils/authentication');

const router = express.Router();

// Create a new order
router.post('/', ordersController.createOrder);

// Mark an order as delivered
router.put('/:orderId/delivered',ordersController.markOrderDelivered);

module.exports = router;

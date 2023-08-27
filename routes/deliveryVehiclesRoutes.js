const express = require('express');
const deliveryVehiclesController = require('../controllers/deliveryVehiclesController');
const authentication = require('../utils/authentication');

const router = express.Router();

// Get all delivery vehicles
router.get('/', deliveryVehiclesController.getDeliveryVehicles);

// Create a new delivery vehicle
router.post('/',deliveryVehiclesController.createDeliveryVehicle);

// Update a delivery vehicle
router.put('/:vehicleId',deliveryVehiclesController.updateDeliveryVehicle);

module.exports = router;

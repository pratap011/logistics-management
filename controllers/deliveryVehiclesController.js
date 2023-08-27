const DeliveryVehicle = require('../models/DeliveryVehicle');

//Controller for retrieving all the available delivery vehicles .

exports.getDeliveryVehicles = async (req, res) => {
  try {
    const deliveryVehicles = await DeliveryVehicle.find();
    res.json(deliveryVehicles);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

//Controller for creating a new delivery vehicle

exports.createDeliveryVehicle = async (req, res) => {
  const { registrationNumber, vehicleType, city } = req.body;
  try {
    const newDeliveryVehicle = await DeliveryVehicle.create({ registrationNumber, vehicleType, city });
    res.status(201).json(newDeliveryVehicle);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

//Controller for updating the existing info of any delivery vehicle.

exports.updateDeliveryVehicle = async (req, res) => {
  const vehicleId = req.params.vehicleId;
  const { registrationNumber, vehicleType, city } = req.body;
  try {
    const updatedDeliveryVehicle = await DeliveryVehicle.findByIdAndUpdate(
      vehicleId,
      { registrationNumber, vehicleType, city },
      { new: true }
    );
    res.json(updatedDeliveryVehicle);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

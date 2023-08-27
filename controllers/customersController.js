const jwt = require('jsonwebtoken');
const Customer = require('../models/Customer');
const authentication = require('../utils/authentication');


// The controller for registering a new customer
exports.registerCustomer = async (req, res) => {
  const { name, city } = req.body;

  try {
    const newCustomer = await Customer.create({ name, city });

    // Generate a token for the registered customer
    var user={userId:newCustomer._id};
    var token=authentication.generateToken(user);
    res.status(200).json({ customer: newCustomer, token });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Internal server error' });
  }
};


// The controller for updating the customer.

exports.updateCustomer = async (req, res) => {
  const customerId = req.params.customerId;
  const { name, city } = req.body;

  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(customerId, { name, city }, { new: true });

    res.status(200).json(updatedCustomer); 
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

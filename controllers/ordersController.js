const Order = require('../models/Order');
const DeliveryVehicle = require('../models/DeliveryVehicle');
const Customer = require('../models/Customer')


// The controller for creating a new order
exports.createOrder = async (req, res) => {
  const customerId = req.user.userId; 
  const { itemId, price, deliveryLocation } = req.body;

  try {
    const customerCity = await getCustomerCity(customerId); 
    const suitableVehicle = await findSuitableDeliveryVehicle(customerCity);
    if(customerCity==0){
      res.send("Please register first!")
    }

    //Checking if there was a vehicle less than 2 active orders and in the same city. 

    if (!suitableVehicle) {
      return res.status(400).json({ message: 'No suitable delivery vehicle available' });
    }

    //Creating a new order and incrementing active delivery count by 1.

    const newOrder = await Order.create({
      itemId,
      price,
      customerId,
      deliveryVehicleId: suitableVehicle._id,
      deliveryLocation
    });
    await DeliveryVehicle.findByIdAndUpdate(
      suitableVehicle._id,
      { $inc: { activeOrdersCount: 1 } }
    );

    res.status(201).json(newOrder);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Internal server error' });
  }
};

//Functino for checking if the delivery truck is available in the customer's city.

async function getCustomerCity(customerId) {
  try {
    console.log(customerId)
    const customer = await Customer.findById(customerId); 
    if(!customer){
      return 0
    }

    return customer.city;
  } catch (error) {
    throw new Error('Error fetching customer city');
  }
}

//Checking if the trucks active delivery count is less than 2.

async function findSuitableDeliveryVehicle(city) {
  try {
    const suitableVehicle = await DeliveryVehicle.findOne({ city, activeOrdersCount: { $lt: 2 } });
    return suitableVehicle;
  } catch (error) {
    throw new Error('Error finding suitable delivery vehicle');
  }
}


// Controller for marking the order as delivered and then decrementing the active delivery count of specific truck by 1.

exports.markOrderDelivered=async(req,res)=>{
  const orderId = req.params.orderId;

  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { $set: { isDelivered: true } },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Decrement the activeOrdersCount field of the delivery vehicle
    await DeliveryVehicle.findByIdAndUpdate(
      updatedOrder.deliveryVehicleId,
      { $inc: { activeOrdersCount: -1 } }
    );

    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
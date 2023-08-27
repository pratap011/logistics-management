const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderNumber: { type: String, unique: true },
  itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
  price: Number,
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
  deliveryVehicleId: { type: mongoose.Schema.Types.ObjectId, ref: 'DeliveryVehicle' },
  isDelivered: { type: Boolean, default: false },
  invoiceId: String,
});

orderSchema.pre('save', async function (next) {
  if (!this.orderNumber) {
    const latestOrder = await this.constructor.findOne({}, {}, { sort: { orderNumber: -1 } });
    const latestOrderNumber = latestOrder ? parseInt(latestOrder.orderNumber) : 0;
    this.orderNumber = (latestOrderNumber + 1).toString().padStart(4, '0');
  }
  next();
});

module.exports = mongoose.model('Order', orderSchema);

const express = require('express');
const mongoose = require('mongoose');
const itemsRoutes = require('./routes/itemsRoute');
const customersRoutes = require('./routes/customersRoutes');
const deliveryVehiclesRoutes = require('./routes/deliveryVehiclesRoutes');
const ordersRoutes = require('./routes/ordersRoutes');
const authentication = require('./utils/authentication');
require('dotenv').config();

// initializing express and connection to mongodb databasee.
const app = express();
const PORT = process.env.PORT || 8000;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });

app.use(express.json());

//Different routings with an authentication middleware which checks the JSON Web Token and extracts the user ID from it.

app.use('/items',authentication.optionalAuthenticate, itemsRoutes);
app.use('/customers', authentication.optionalAuthenticate, customersRoutes);
app.use('/delivery-vehicles',authentication.authenticate, deliveryVehiclesRoutes);
app.use('/orders', authentication.authenticate, ordersRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const Item = require('../models/Item');

//Controller for getting all the available items.

exports.getItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

//Controller for creating a specific item by inputting name and price.
exports.createItems = async (req, res) => {
  const { name, price } = req.body;
  try {
    const newItem = await Item.create({ name, price });
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};


//Controller for updating the name and price of a specific item.
exports.updateItem = async (req, res) => {
  const itemId = req.params.itemId;
  const { name, price } = req.body;
  try {
    const updatedItem = await Item.findByIdAndUpdate(itemId, { name, price }, { new: true });
    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

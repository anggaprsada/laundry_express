const { Order } = require('../../models');

module.exports = async (req, res) => {
  const orders = await Order.findAll({
    attributes: [
      'id', 
      'customerId', 
      'orderdate',
      'status',
      'productName',
      'quantity',
      'price'
    ]
  });
  res.json({ status: 'success', data: orders });
};
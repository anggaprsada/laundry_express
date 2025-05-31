const { Order } = require('../../models');

module.exports = async (req, res) => {
  const order = await Order.findByPk(req.params.id, {
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

  if (!order) {
    return res.status(404).json({
      status: 'error',
      message: 'Order not found'
    });
  }

  res.json({ status: 'success', data: order });
};
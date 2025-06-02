const { Order, Customer } = require('../../models');

module.exports = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id, {
      attributes: [
        'id',
        'productName',
        'quantity',
        'status',
        'price',
        'orderDate'
      ],
      include: {
        model: Customer,
        as: 'customer',
        attributes: ['id', 'name']
      }
    });

    if (!order) {
      return res.status(404).json({
        status: 'error',
        message: 'Order not found'
      });
    }

    res.json({ status: 'success', data: order });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
};

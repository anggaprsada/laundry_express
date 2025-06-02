const { Order, Customer } = require('../../models');

module.exports = async (req, res) => {
  const id = req.params.id;

  try {
    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(404).json({
        status: 'error',
        message: 'Order not found'
      });
    }

    await order.destroy();

    const orders = await Order.findAll({
      attributes: [
        'id',
        'orderDate',
        'status',
        'productName',
        'quantity',
        'price'
      ],
      include: {
        model: Customer,
        as: 'customer',
        attributes: ['id', 'name']
      }
    });

    return res.json({
      status: 'success',
      data: orders
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
};

const { Order, Customer } = require('../../models');

module.exports = async (req, res) => {
  try {
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

    res.json({ status: 'success', data: orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: error.message });
  }
};

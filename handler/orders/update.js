const { Order } = require('../../models');
const Validator = require('fastest-validator');
const v = new Validator();

module.exports = async (req, res) => {
  const schema = {
    status: { type: 'string', optional: true, empty: false, enum: ['pending', 'processing', 'completed', 'cancelled'] },
    productName: { type: 'enum', optional: true, values: ['cepat', 'kilat', 'mantap'], empty: false },
    quantity: { type: 'number', positive: true, optional: true, empty: false }
  };

  const validate = v.validate(req.body, schema);
  if (validate.length) {
    return res.status(400).json({
      status: 'error',
      message: validate
    });
  }

  const orderId = req.params.id;

  try {
    const order = await Order.findByPk(orderId);

    if (!order) {
      return res.status(404).json({
        status: 'error',
        message: 'Order not found'
      });
    }

    const updates = {};

    if (req.body.status) updates.status = req.body.status;
    if (req.body.productName) updates.productName = req.body.productName;
    if (req.body.quantity) updates.quantity = req.body.quantity;

    // Hitung ulang price jika productName atau quantity diubah
    if (updates.productName || updates.quantity) {
      const productName = updates.productName || order.productName;
      const quantity = updates.quantity || order.quantity;

      let pricePerUnit;
      switch (productName) {
        case 'cepat': pricePerUnit = 5000; break;
        case 'kilat': pricePerUnit = 7000; break;
        case 'mantap': pricePerUnit = 10000; break;
        default: pricePerUnit = 0;
      }

      updates.price = (quantity * pricePerUnit).toFixed(2);
    }

    await order.update(updates);

    return res.json({
      status: 'success',
      message: 'Order updated successfully',
      data: {
        id: order.id,
        status: order.status,
        productName: order.productName,
        quantity: order.quantity,
        price: order.price
      }
    });
  } catch (error) {
    console.error('Sequelize error:', error);

    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
      detail: error.message
    });
  }
};

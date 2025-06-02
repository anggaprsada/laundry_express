const { Order, Customer } = require('../../models');
const Validator = require('fastest-validator');
const v = new Validator();

module.exports = async (req, res) => {
  if (req.body.customer_id && !req.body.customerId) {
    req.body.customerId = req.body.customer_id;
  }

  const schema = {
    customerId: { type: "number", integer: true, positive: true, empty: false },
    status: { type: "enum", values: ['Pending', 'Processing', 'Completed', 'Cancelled'], optional: true },
    orderDate: { type: "date", optional: true },
    productName: { type: "enum", values: ['Cepat', 'Kilat', 'Mantap'] },
    quantity: {type: "number", positive: true, empty: false}
  };

  // Validasi body request
  const validate = v.validate(req.body, schema);
  if (validate.length) {
    return res.status(400).json({
      status: 'error',
      message: validate
    });
  }

  try {
    // Cek customer valid
    const customer = await Customer.findByPk(req.body.customerId, {
      attributes: ['id']
    });

    if (!customer) {
      return res.status(404).json({
        status: 'error',
        message: 'Customer not found'
      });
    }

    let pricePerUnit;
    switch (req.body.productName) {
      case 'Cepat':
        pricePerUnit = 5000;
        break;
      case 'Kilat':
        pricePerUnit = 7000;
        break;
      case 'Mantap':
        pricePerUnit = 10000;
        break;
      default:
        pricePerUnit = 0; 
    }

    const quantity = parseFloat(req.body.quantity);
    const price = (quantity * pricePerUnit).toFixed(2);

    const order = await Order.create({
      customerId: req.body.customerId,
      orderDate: req.body.orderDate || new Date(),
      status: req.body.status || 'Pending',
      productName: req.body.productName,
      quantity,
      price
    });

    return res.status(201).json({
      status: 'success',
      data: { id: order.id }
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

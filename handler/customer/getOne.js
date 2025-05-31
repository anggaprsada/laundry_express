const { Customer } = require('../../models');

module.exports = async (req, res) => {
  const customer = await Customer.findByPk(req.params.id, {
    attributes: ['id', 'name', 'phone']
  });

  if (!customer) {
    return res.status(404).json({
      status: 'error',
      message: 'Customer not found'
    });
  }

  res.json({ status: 'success', data: customer });
};

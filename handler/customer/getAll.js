const { Customer } = require('../../models');

module.exports = async (req, res) => {
  const customers = await Customer.findAll({
    attributes: ['id', 'name', 'phone']
  });
  res.json({ status: 'success', data: customers });
};

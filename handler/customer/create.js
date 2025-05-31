const { Customer } = require('../../models');
const Validator = require('fastest-validator');
const v = new Validator();

module.exports = async (req, res) => {
  const schema = {
    name: 'string|empty:false',
    phone: 'string|empty:false|min:10|max:15',
  };

  const validate = v.validate(req.body, schema);
  if (validate.length) {
    return res.status(400).json({
      status: 'error',
      message: validate
    });
  }

  const existing = await Customer.findOne({
    where: { phone: req.body.phone },
    attributes: ['id']
  });

  if (existing) {
    return res.status(400).json({
      status: 'error',
      message: 'Phone already exists'
    });
  }

  const customer = await Customer.create({
    name: req.body.name,
    phone: req.body.phone
  });

  return res.status(201).json({
    status: 'success',
    data: { id: customer.id }
  });
};

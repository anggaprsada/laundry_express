const bcrypt = require('bcrypt');
const { User } = require('../../models');
const Validator = require('fastest-validator');
const v = new Validator();

module.exports = async (req, res) => {
  const schema = {
    name: 'string|empty:false',
    email: 'email|empty:false',
    pass: 'string|min:6',
  };

  const validate = v.validate(req.body, schema);
  if (validate.length) {
    return res.status(400).json({
      status: 'error',
      message: validate
    });
  }

  const existing = await User.findOne({
    where: { email: req.body.email },
    attributes: ['id']
  });

  if (existing) {
    return res.status(400).json({
      status: 'error',
      message: 'Email already exists'
    });
  }

  const password = await bcrypt.hash(req.body.pass, 10);

  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    pass: password
  });

  return res.status(201).json({
    status: 'success',
    data: { id: user.id }
  });
};

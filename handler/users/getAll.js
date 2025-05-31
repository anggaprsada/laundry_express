const { User } = require('../../models');

module.exports = async (req, res) => {
  const users = await User.findAll({
    attributes: ['id', 'name', 'email']
  });
  res.json({ status: 'success', data: users });
};

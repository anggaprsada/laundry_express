const { Customer } = require('../../models');

module.exports = async (req, res) => {
  const [updated] = await Customer.update(req.body, { 
    where: { 
      id: req.params.id 
    } 
  });
  if (!updated) return res.status(404).json({ 
    status: 'error', message: 'Customer not found' 
  });
  res.json({ status: 'success', message: 'Customer updated' });
};

const express = require('express');
const app = express();

app.use(express.json());

app.use('/customers', require('./routes/customers'));
app.use('/orders', require('./routes/orders'));
app.use('/users', require('./routes/users'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

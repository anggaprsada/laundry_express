const express = require('express');
const router = express.Router();

const customerHandler = require('../handler/customer');

router.post('/add', customerHandler.create);
router.get('/', customerHandler.getAll);
router.get('/:id', customerHandler.getOne);
router.put('/:id', customerHandler.update);
router.delete('/:id', customerHandler.delete);

module.exports = router;

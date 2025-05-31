const express = require('express');
const router = express.Router();

const userHandler = require('../handler/orders');

router.post('/add', userHandler.create);
router.get('/', userHandler.getAll);
router.get('/:id', userHandler.getOne);
router.put('/:id', userHandler.update);
router.delete('/:id', userHandler.delete);

module.exports = router;
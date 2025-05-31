const express = require('express');
const router = express.Router();

const userHandler = require('../handler/users');
const verify = require('../middleware/VerifyTokens');

router.post('/register', userHandler.create);
router.post('/login', userHandler.login);
router.get('/', userHandler.getAll);
router.get('/:id', verify,userHandler.getOne);
router.put('/:id', verify,userHandler.update);
router.delete('/:id', verify,userHandler.delete);

module.exports = router;

const express = require('express');
const router = express.Router();
const {LoginUser, RegisterUser,changeUsername} = require('../controllers/User');

router.post('/register', RegisterUser);
router.post('/login', LoginUser);
router.patch('/:id/changeusername',changeUsername);

module.exports = router;

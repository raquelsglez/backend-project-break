const express = require("express");
const router = express.Router();
const authtController = require('../controllers/authController');
const firebaseConfig = require('../config/firebase')

router.get('/login', authtController.getLoginForm);
router.get('/register', authtController.getRegisterForm);

router.post('/auth/login', firebaseConfig.loginEmailPassword);
router.post('/auth/register', firebaseConfig.registerEmailPassword);
router.get('/auth/logout', firebaseConfig.logout);

module.exports = router;

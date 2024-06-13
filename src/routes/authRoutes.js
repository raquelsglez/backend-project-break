const express = require("express");
const router = express.Router();
const authtController = require('../controllers/authController');
const firebaseConfig = require('../config/firebase')
const errorMiddleware = require('../middlewares/errorsMiddleware');

router.get('/login', authtController.getLoginForm);
router.get('/register', authtController.getRegisterForm);

router.post('/auth/login', firebaseConfig.loginEmailPassword, errorMiddleware.errorMiddleware);
router.post('/auth/register', firebaseConfig.registerEmailPassword, errorMiddleware.errorMiddleware);
router.get('/auth/logout', firebaseConfig.logout);

module.exports = router;

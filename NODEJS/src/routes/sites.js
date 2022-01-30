const express = require('express');
const router = express.Router();

const siteController = require('../app/controllers/SiteController')

//define route
router.post('/register/send-otp', siteController.sendOtp);

router.post('/register', siteController.register);
router.post('/login', siteController.login);
router.post('/logout', siteController.logout);

router.get('/register', siteController.showRegister);
router.get('/login', siteController.showLogin);

router.get('/home', siteController.showHome);
module.exports = router;
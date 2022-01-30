const express = require('express');
const ShipperController = require('../app/controllers/ShipperController');
const router = express.Router();
const Authenticated = require('../app/controllers/Authenticated')

//define route
router.get('/shipper',Authenticated.checkAuthenticated, ShipperController.showHome);
router.post('/shipper',Authenticated.checkAuthenticated, ShipperController.switchpage);
router.get('/OrderList',Authenticated.checkAuthenticated,ShipperController.showShipperOrderList);
router.get('/orderdetails',Authenticated.checkAuthenticated, ShipperController.showOrderDetail);
router.get('/OrderHistory',Authenticated.checkAuthenticated, ShipperController.showHistoryOfOrder);
router.get('/updateorderstatus',Authenticated.checkAuthenticated, ShipperController.showUpdateOrderStatus);
router.post('/updateorderstatus',Authenticated.checkAuthenticated, ShipperController.addHistoryStatus);
router.get('/searchOrder',Authenticated.checkAuthenticated, ShipperController.searchNewOrder);
module.exports = router;
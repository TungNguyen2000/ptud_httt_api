const express = require('express');
const router = express.Router();

const buyerController = require('../app/controllers/BuyerController')
const Authenticated = require('../app/controllers/Authenticated')
//define route
router.get('/', buyerController.showHome);
router.get('/store-detail/:storeid',Authenticated.checkAuthenticated, buyerController.showShopDetail);
router.get('/checkout',Authenticated.checkAuthenticated,buyerController.showCheckOut)
router.get('/user',Authenticated.checkAuthenticated,buyerController.showUser)
router.post('/api/stores', buyerController.getStoreNear)

router.post('/api/carts', buyerController.getMyCart)

router.post('/api/cartitems',Authenticated.checkAuthenticated, buyerController.addCartItem)
router.put('/api/cartitems',Authenticated.checkAuthenticated, buyerController.editCartItem)
router.delete('/api/cartitems',Authenticated.checkAuthenticated, buyerController.removeCartItem)

router.post('/api/order',Authenticated.checkAuthenticated, buyerController.Order)

router.get('/404', buyerController.show404)
module.exports = router;
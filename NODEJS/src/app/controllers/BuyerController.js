
const { default: axios } = require('axios');
const fs = require('fs');
const path = require('path')
const { redirect } = require('express/lib/response');
const BuyerRepository = require('../repository/BuyerRepository');
var buyerRepository = require('../repository/BuyerRepository')
const localtion = require('../../public/vietnam-address.json')
class BuyerController {
    //[GET] /
    async showHome(req, res, next) {
        res.render("buyer-layout/sites/index", {
            layout: "../buyer-layout/layout",
            user: req.user,
        });
    }
    //[GET] /store-detail
    async showShopDetail(req, res, next) {
        try {
            const storeid = req.params.storeid
            const producttype = await buyerRepository.getProductTypeOfStore(storeid);
            const products = await buyerRepository.getProductOfStore(storeid)
            products.forEach(product => {
                const isProductType = (element) => element.productTypeId == product.productType.productTypeId;
                var product_type_index = producttype.findIndex(isProductType)
                if (!producttype[product_type_index].products) {
                    producttype[product_type_index].products = []
                }
                producttype[product_type_index].products.push(product)
            });
            res.render("buyer-layout/sites/store-detail", {
                layout: "../buyer-layout/layout",
                user: req.user,
                ProductType: producttype

            });
        } catch (error) {
            return res.redirect('/404');
        }
    }
    //[GET] /checkout
    async showCheckOut(req, res, next) {
        try {
            res.render("buyer-layout/sites/checkout", {
                layout: "../buyer-layout/layout",
                user: req.user,
            });
        } catch (error) {
            return res.redirect('/404');
        }
    }
    //[GET] /user
    async showUser(req, res, next) {
        res.render("buyer-layout/sites/user", {
            layout: "../buyer-layout/layout",
            user: req.user,
        });
    }
    //[POST] /api/store
    async getStoreNear(req, res, next) {
        try {
            const local = req.body.local;
            const stores = await buyerRepository.getNearbyStore(local)
            res.json(stores)
        } catch (error) {
            console.error(error);
        }
    }
    //[POST] /api/carts
    async getMyCart(req, res, next) {
        try {
            let cart = null;
            if (req.user) {
                const result = await buyerRepository.getMyCart(req.user.userId);
                cart = result;
            }
            res.json(cart)
        } catch (error) {
            console.error(error);
        }
    }
    //[POST] /api/cartitems
    async addCartItem(req, res, next) {
        try {
            let cartitem = req.body
            if (req.user.userId != cartitem.UserId) {
                throw Error("bad request!")
            }
            const result = await buyerRepository.addCartItems(cartitem, req.user.userId);
            res.json(result);
        } catch (error) {
            console.error(error);
        }
    }
    //[PUT] /api/cartitems
    async editCartItem(req, res, next) {
        try {
            let cartitem = req.body
            if (req.user.userId != cartitem.UserId) {
                throw Error("bad request!")
            }
            
            const result = await buyerRepository.editCartItem(cartitem, req.user.userId);
            res.json(result);

        } catch (error) {
            console.error(error);
        }
    }
    //[Delete] /api/cartitems
    async removeCartItem(req, res, next) {
        try {
            let cartitem = req.body
            if (req.user.userId != cartitem.UserId) {
                throw Error("bad request!")
            }
            const result = await BuyerRepository.removeCartItem(cartitem.CartId, cartitem.ProductId, req.user.userId)
            res.json(result)
        } catch (error) {
            console.error(error);
        }
    }
    //[POST] /api/order
    async Order(req, res, next) {
        try {
            if (!req.user) {
                throw Error("bad request!")
            }
            const deliver_info = req.body
            const result = await buyerRepository.getMyCart(req.user.userId);
            const cart = result;
            const send_data = {
                OrderQuantity: cart.cartQuantity,
                OrderPrice: cart.cartPrice,
                OrderAddress: deliver_info.address,
                OrderPhone: deliver_info.phone,
                BuyerId: req.user.userId,
                OrderItems: []
            }
            cart.cartItems.forEach((item) => {
                send_data.OrderItems.push(
                    {
                        ProductId: item.productId,
                        OrderItemQuantity: item.cartItemQuantity,
                        OrderItemDiscount: 0,
                        OrderItemPrice: item.cartItemPrice,
                    }
                )
            })
            const order = await BuyerRepository.Order(send_data)
            res.redirect('/user/')
        } catch (error) {
            console.error(error);
        }
    }
    show404(req, res, next) {
        res.render("buyer-layout/sites/404", {
            layout: "../buyer-layout/layout",
            user: req.user,
        });
    }

}

module.exports = new BuyerController();

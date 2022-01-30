const axios = require("axios");
const https =require("https")
const httpJava = "http://localhost:8081/api/v1";
const httpDotNET = "https://localhost:44318/api";
const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
})
axios.defaults.httpsAgent = httpsAgent
class BuyerRepository {
    async getNearbyStore(local) {
        const stores = await axios.get(httpJava + "/stores", {
            params: {
                local: local,
            },
        });
        return stores.data
    }
    async getProductTypeOfStore(storeid) {
        const producttype = await axios.get(httpJava + '/producttype/' + storeid)
        return producttype.data
    }
    async getProductOfStore(storeid) {
        const products = await axios.get(httpJava + '/products', {
            params: {
                storeid: storeid
            }
        })
        return products.data
    }
    async getMyCart(UserId) {
        const cart = await axios.get(httpDotNET + '/carts/' + UserId);
        return cart.data
    }
    async addCartItems(item, userId) {
        const cartItem = await axios({
            method: "POST",
            url: httpDotNET + "/CartItems",
            params: { userId: userId },
            data: { ...item }
        })
        return cartItem.data
    }
    async removeCartItem(cartId, productId, userId) {

        const cartItem = await axios({
            method: "delete",
            url: httpDotNET + "/cartitems",
            params: { cartId: cartId, productId: productId, userId: userId }
        })
        return cartItem.data
    }
    async editCartItem(item, userId) {
        const cartItem = await axios({
            method: "put",
            url: httpDotNET + "/cartitems",
            params: { userId: userId },
            data: { ...item }
        })
        return cartItem.data
    }
    async Order(data) {
        const order = await axios({
            method: "post",
            url: httpDotNET + "/Orders",
            data: { ...data }
        })
        return order.data
    }
}

module.exports = new BuyerRepository();
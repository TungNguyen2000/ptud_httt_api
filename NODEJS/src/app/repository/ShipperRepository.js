const axios = require("axios");
const httpasp = "https://localhost:44324/api/shipper/";
const httpjava = "http://localhost:8080/api/shipper/";
const https = require('https');

class ShipperRepository {
    async getShipperOrderList(shipperid) {
        const orders = await axios.get(httpasp + shipperid + '/history');
        return orders.data;
    }

    async getorderdetail(orderid) {
        const od = await axios.get(httpasp + orderid + '/orderdetails');
        return od.data;
    }

    async getorderhistory(orderid) {
        const his = await axios.get(httpasp + orderid + '/historystatus');
        return his.data;
    }

    async addOrderHistory(OrderId, OrderStatus, OrderStatusDate) {
        const p = await axios.post(httpjava + 'status/updatestatus',
            { orderid: OrderId, orderStatus: OrderStatus, orderStatusDate: OrderStatusDate });
        return p.data;
    }

    async searchForNewOrder(local) {
        const new_orders = await axios.get(httpjava + 'findorder', {
            params: {
                local: local,
            },
        });
        return new_orders.data;
    }
}

module.exports = new ShipperRepository();
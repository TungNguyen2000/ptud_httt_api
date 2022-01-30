var shipperRepo = require('../repository/ShipperRepository')
class ShipperController{

    async showHome(req, res, next) {
        res.render("shipper-layout/sites/index", {
            layout: "../shipper-layout/layout",
        });

    }

    async switchpage(req,res,next){
       
    }
    //[GET]/shipperOrderList
    async showShipperOrderList(req, res, next){
        //const id = req.query.inputid;
        const orderlist = await shipperRepo.getShipperOrderList(req.user.userId);
        res.render("shipper-layout/sites/OrderList", {layout: "../shipper-layout/layout", OrderList: orderlist});
    }
    
    //[get]/orderdetails
    async showOrderDetail(req,res,next){
        const orderid = req.query.orderdetailid;
        const orderde = await shipperRepo.getorderdetail(orderid);
        console.log(orderid);
        //const orderdetail = await shipperRepo.getorderdetail(orderid);
        res.render("shipper-layout/sites/OrderDetails", {layout: "../shipper-layout/layout", OrderDetail: orderde});
    }

    async showHistoryOfOrder(req,res,next){
        const orderid = req.query.orderhistoryid;
        const orderhis = await shipperRepo.getorderhistory(orderid);
        res.render("shipper-layout/sites/OrderHistory", {layout: "../shipper-layout/layout", OrderHistory: orderhis, OrderId: orderid});
    }

    async showUpdateOrderStatus(req, res, next){
        const orderid = req.query.inputorderid;
        res.render("shipper-layout/sites/updateorderstatus", {layout: "../shipper-layout/layout", OrderId: orderid});
    }

    async addHistoryStatus(req, res, next){
        const inputid = req.body.inputorderid;
        const status = req.body.selectstatus;
        var newdate = new Date();
        const datetime = newdate.toLocaleDateString('en-GB').split('/').reverse().join('-'); // '20211124'
        const result = await shipperRepo.addOrderHistory(inputid,status, datetime);
        res.render("shipper-layout/sites/index", {layout:  "../shipper-layout/layout"});
    }
    //[get]//searchOrder
    async searchNewOrder(req,res,next){
        const local = req.query.selectcity;
        const new_Orders = await shipperRepo.searchForNewOrder(local);
        console.log(new_Orders);
        res.render("shipper-layout/sites/searchOrder", {layout:  "../shipper-layout/layout", NewOrders: new_Orders});
    }

    //[post]/searchOrder
    
}

module.exports = new ShipperController();
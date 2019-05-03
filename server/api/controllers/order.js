const Order = require('../models/order')
const Product = require('../models/product')
const mongoose = require('mongoose')

exports.orders_get_all = (req,res,next)=>{
    Order.find().select("product quantity _id").populate("product", "name").exec().then(orders =>{
        res.status(200).json({
            count : orders.length,
            orders : orders.map((order)=>{
                return{
                    _id : order._id,
                    product : order.product,
                    quantity : order.quantity,
                    request : {
                        type : "GET",
                        url : "http://localhost:3000/orders" + order._id
                    }
                }
            }),
           
        })
    }).catch(err =>{
        res.status(500).json({error : err})
    })
}

exports.orders_create_orders = (req,res,next)=>{
    Product.findById(req.body.productId).then(product =>{
        if (!product){
            return res.status(404).json({
                message : "Product not found"
            })
        }
        const order = new Order({
            _id : mongoose.Types.ObjectId(),
            quantity : req.body.quantity,
            product : req.body.productId
        })
        return order.save();
    }).then((order)=>{
        console.log(order)
        res.status(201).json({
            message : "Order stored",
            createdOrder : {
                _id : order._id,
                product : order.product,
                quantity : order.quantity
            },
            request : {
                type : "GET",
                url : "http://localhost:3000/orders" + order._id
            }
        })
    }).catch( err =>{
        console.log(err)
        res.status(500).json({error : err})
    })
}

exports.orders_get_order =  (req,res,next)=>{
    Order.findById(req.params.orderId).populate("product").exec().then(order =>{
        res.status(200).json({
            order : order,
            request : {
                type : "GET",
                url : 'http://localhost:3000/orders'
            }
        })
    }).catch(err =>{
        res.status(500).json({error : err})
    })
}

exports.orders_delete_order =  (req,res,next)=>{
    Order.remove({_id : req.params.orderId}).exec().then(order=>{
        if(!order){
            return res.status(404).json({
                message : "Order not found"
            })
        }
        res.status(200).json({
            message : "Order deleted",
            request : {
                type : "POST",
                url : "http://localhost:3000/orders/" + req.params.orderId,
                body : {productId : "ID", quantity : "Number"}
            }
        })
    }).catch(err =>{
        res.status(500).json({error : err})
    })
}
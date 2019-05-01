const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth')
const OrdersControllers = require("../controllers/order")

router.get('/', checkAuth, OrdersControllers.orders_get_all)
router.post('/',checkAuth, OrdersControllers.orders_create_orders)    
router.get('/:orderId',checkAuth, OrdersControllers.orders_get_order)
router.delete('/:orderId',checkAuth, OrdersControllers.orders_delete_order)

module.exports = router
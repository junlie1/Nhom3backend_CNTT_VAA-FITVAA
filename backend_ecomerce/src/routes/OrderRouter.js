const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/OrderController');
const { authUserMiddleWare } = require('../middleware/authMiddleware');
// const authMiddleware = require('../middleware/authMiddleware')

//Bộ định tuyến gọi test api
router.post('/create',authUserMiddleWare, OrderController.createOrder);
router.post('/create-app', OrderController.createOrderApp);
router.post('/payment-app', OrderController.paymentApp);
router.get('/payment-app-intent/:id', OrderController.paymentAppIntent);
router.get('/get-order-details/:id',authUserMiddleWare, OrderController.getDetailsOrder);


module.exports = router;
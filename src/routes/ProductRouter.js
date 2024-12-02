const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');
const { authMiddleWare } = require('../middleware/authMiddleware');
// const authMiddleware = require('../middleware/authMiddleware')

//Bộ định tuyến gọi test api
router.post('/create', ProductController.createProduct);
router.put('/update/:id',authMiddleWare,ProductController.updateProduct);
router.get('/get-details/:id',ProductController.getDetailProduct);
router.get('/get-all',ProductController.getAllProduct);
router.get('/get-all-poductType',ProductController.getAllProductType);
router.get('/get-all-app',ProductController.getAllProductApp);
router.delete('/delete/:id',ProductController.deleteProduct);
router.get('/get-all-type',ProductController.getAllType);


module.exports = router;
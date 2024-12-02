const OrderService = require('../services/OrderService.js');
const stripe = require('stripe')("sk_test_51QQAS0FV5SaBBPCR0envszYXsbSk9H8QsTVe4PWuunkI2jAe3BeX5oARpfiURXjLC5fuwmQOirKjshPHxCKFSLdU00rtNXalHf");


const createOrder = async (req, res) => {
    try {
        const {
            paymentMethod,
            itemsPrice,
            shippingPrice,
            fullName,
            totalPrice,
            address,
            city,
            phone,
            orderItems,
            user
        } = req.body;

        console.log('req.body', req.body);

        // Kiểm tra các trường dữ liệu là bắt buộc
        if (
            !paymentMethod || 
            !itemsPrice || 
            !fullName || 
            !totalPrice || 
            !address || 
            !city || 
            !phone || 
            !orderItems || 
            !user
        ) {
            return res.status(400).json({
                status: "error",
                message: "Các trường dữ liệu là bắt buộc"
            });
        }

        // Gọi OrderService để tạo đơn hàng
        const response = await OrderService.createOrder(req.body);
        return res.status(200).json(response);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: "error",
            message: error.message || "Đã xảy ra lỗi"
        });
    }
}
const createOrderApp = async (req, res) => {
    try {
        const {
            paymentMethod,
            itemsPrice,
            shippingPrice,
            totalPrice,
            shippingAddress, // Lấy trực tiếp shippingAddress
            orderItems,
            user
        } = req.body;
    
        console.log('shippingAddress:', shippingAddress);
        
        // Kiểm tra các trường dữ liệu là bắt buộc
        if (
            !paymentMethod || 
            !itemsPrice || 
            !totalPrice || 
            !shippingAddress || // Kiểm tra shippingAddress có tồn tại
            !shippingAddress.fullName || // Kiểm tra các trường bên trong shippingAddress
            !shippingAddress.address || 
            !shippingAddress.city || 
            !shippingAddress.phone || 
            !orderItems || 
            !user
        ) {
            return res.status(400).json({
                status: "error",
                message: "Các trường dữ liệu là bắt buộc"
            });
        }
    
        // Gọi OrderService để tạo đơn hàng
        const response = await OrderService.createOrderApp(req.body);
        return res.status(200).json(response);
    
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: "error",
            message: error.message || "Đã xảy ra lỗi"
        });
    }
}

const getDetailsOrder = async (req,res) => {
    try {
        const userId = req.params.id;
        if(!userId) {
            return res.status(404).json({
                status: "error",
                message: "Không tìm User"
            });
        }
        
        //Truyền req.body sang UserService gán vào newUser
        const response = await OrderService.getOrderDetails(userId);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(404).json({
            mesage: error
        });
    }
}

const paymentApp = async (req,res) => {
    try {
        const {amount, currency} = req.body;

        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency,
        });

        return res.status(200).json(paymentIntent);
        } catch (e) {
        return res.status(500).json({error:e.message});
        }
}
const paymentAppIntent = async (req,res) => {
    try {
        const paymentIntent = await stripe.paymentIntents.retrieve(req.params.id);
        return res.status(200).json(paymentIntent);
    } catch (error) {
        return res.status(500).json({error:e.message});
    }
}
const getMyOrders = async (req, res) => {
    try {
        const userId = req.params.id; // Lấy userId từ params
        const orders = await OrderService.getOrderDetails(userId); // Gọi service để lấy đơn hàng
        return res.status(200).json(orders);
    } catch (error) {
        console.error('Get my orders error:', error);
        return res.status(500).json({
            status: "error",
            message: "Lỗi khi lấy danh sách đơn hàng"
        });
    }
}
module.exports = {
    createOrder,
    createOrderApp,
    getDetailsOrder,
    paymentApp,
    paymentAppIntent,
    getMyOrders
};
const UserRouter = require('./UserRouter');
const ProductRouter = require('./ProductRouter');
const PaymentRouter = require('./PaymentRouter'); // Import PaymentRouter


const routes = (app) => {
    app.use('/api/user', UserRouter);
    app.use('/api/product', ProductRouter);
    app.use('/api/payment', PaymentRouter);

}

module.exports = routes;
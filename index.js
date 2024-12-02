const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const routes = require('./src/routes/index');
const cors = require('cors');
const cookieParser = require('cookie-parser')

dotenv.config()

const app = express();
const PORT = process.env.PORT || 3001;
mongoose.connect('mongodb+srv://letrung:trung2432004@cluster0.z6zsx.mongodb.net/ecom_db')
    .then(() => console.log("Conneect thành công"))
    .catch(err => console.log("Connect error",err))


// Cấu hình CORS chi tiết hơn
app.use(cors({
    origin: 'http://localhost:8000', // URL của frontend React
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'token'],
    credentials: true,
    exposedHeaders: ['Content-Length', 'X-Foo', 'X-Bar']
}));

// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());
app.use(express.urlencoded({ limit: '50mb', extended: true }));

routes(app);


app.listen(PORT, () => {
    console.log(`Server is running on port:`, PORT);
    
})

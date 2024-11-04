const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const authMiddleWare = (req, res, next) => {
    const token = req.headers.token?.split(' ')[1];
    
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET , function (err, user) {
        if(err) {
            console.error("JWT Verify Error:", err);
            return res.status(404).json({
                message: "The authenication",
                status: "Error"
            });
        }
        const payload = user;
        if(payload?.isAdmin) {
            next();
        }
        else {
            return res.status(404).json({
                message: "Không tìm thấy user",
                status: "Error"
            });
        }
    });
}

module.exports = {
    authMiddleWare
}

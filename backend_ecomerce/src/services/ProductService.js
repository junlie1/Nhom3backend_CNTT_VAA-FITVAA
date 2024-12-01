const Product = require('../models/ProductModel');
const removeAccents = require('remove-accents');

const createProduct = (newProduct) => {
    return new Promise(async(resolve,reject) => {
        try {
            const {name, image, type, price, countInStock,rating,description} = newProduct;
            const checkProduct = await Product.findOne({
                name: name
            });
            if(checkProduct !== null) {
                resolve({
                    status: 500,
                    message: "Sản phẩm đã tồn tại với tên như vậy"
                })
            }

            const nameNormalized = removeAccents(name.toLowerCase());
            const descriptionNormalized = removeAccents(description.toLowerCase());

            const createdProduct = await Product.create({
                name, 
                nameNormalized,
                image, 
                type, 
                price, 
                countInStock,
                rating,
                description,
                descriptionNormalized
            });
            if(createdProduct) {
                resolve({
                    status: "OK",
                    message: "Tạo thành công sản phẩm mới mới",
                    data: createdProduct
                })
            } 
        } catch (error) {
            reject(error);
        }
    })
}

const updateProduct = (id, data) => {
    return new Promise(async(resolve,reject) => {
        try {
            const checkProduct = await Product.findOne({
                _id: id
            });
            
            if(checkProduct === null) {
                resolve({
                    status: 404,
                    message: "Sản phẩm chưa tồn tại"
                })
            }
            const updatedProduct = await Product.findByIdAndUpdate(id, data, {new:true})
            resolve({
                status: "OK",
                message: "Đổi thông tin thành công",
                data: updatedProduct
            })
        } catch (error) {
            reject(error);
        }
    })
}

const deleteProduct = (id) => {
    return new Promise(async(resolve,reject) => {
        try {
            const checkProduct = await Product.findOne({
                _id: id
            });
            
            if(checkProduct === null) {
                resolve({
                    status: 500,
                    message: "Không tìm thấy product để xóa"
                })
            }
            await Product.findByIdAndDelete(id)
            resolve({
                status: "OK",
                message: "Xóa sản phẩm thành công"
            })
        } catch (error) {
            console.error("Delete error", error);
            reject(error);
        }
    })
}

const getAllProduct = (filterOption, sortOption, skip, limit) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Lấy tổng số sản phẩm theo filter nếu có
            const totalProduct = await Product.countDocuments(filterOption);

            // Truy vấn sản phẩm dựa vào filterOption và sortOption, với phân trang skip và limit
            const products = await Product.find(filterOption)
                .sort(sortOption)
                .skip(skip)
                .limit(limit);

            resolve({
                status: "OK",
                message: "Lấy danh sách sản phẩm thành công",
                data: products,
                total: totalProduct,
                pageCurrent: Math.ceil(skip / limit) + 1,
                totalPage: Math.ceil(totalProduct / limit),
            });
        } catch (error) {
            console.error("Lỗi trong getAllProduct:", error);
            reject(error);
        }
    });
};



const getDetailProduct = (id) => {
    return new Promise(async(resolve,reject) => {
        try {
            const product = await Product.findOne({
                _id: id
            });
            
            if(product === null) {
                resolve({
                    status: 404,
                    message: "Không có product trong database"
                })
            }
            resolve({
                status: 200,
                message: "Lấy thông tin thành công",
                data: product //
            })
        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    getDetailProduct,
    getAllProduct
};
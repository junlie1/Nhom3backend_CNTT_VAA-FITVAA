const Product = require('../models/ProductModel');

const removeAccents = require('remove-accents');

const createProduct = (newProduct) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { name, image, type, price, countInStock, rating, description, discount } = newProduct;

            const checkProduct = await Product.findOne({ name });
            if (checkProduct) {
                return resolve({
                    status: 500,
                    message: "Sản phẩm đã tồn tại với tên như vậy"
                });
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
                discount,
                descriptionNormalized
            });

            return resolve({
                status: "OK",
                message: "Tạo thành công sản phẩm mới",
                data: createdProduct
            });
        } catch (error) {
            return reject(error);
        }
    });
};

const updateProduct = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findById(id);

            if (!checkProduct) {
                return resolve({
                    status: 404,
                    message: "Sản phẩm chưa tồn tại"
                });
            }

            const updatedProduct = await Product.findByIdAndUpdate(id, data, { new: true });
            return resolve({
                status: "OK",
                message: "Đổi thông tin thành công",
                data: updatedProduct
            });
        } catch (error) {
            return reject(error);
        }
    });
};

const deleteProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findById(id);

            if (!checkProduct) {
                return resolve({
                    status: 500,
                    message: "Không tìm thấy product để xóa"
                });
            }

            await Product.findByIdAndDelete(id);
            return resolve({
                status: "OK",
                message: "Xóa sản phẩm thành công"
            });
        } catch (error) {
            console.error("Delete error", error);
            return reject(error);
        }
    });
};

const getAllProduct = (filterOption, sortOption, skip, limit) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log("Filter Option:", filterOption);
             // Lấy tổng số sản phẩm theo filter nếu có
             const totalProduct = await Product.countDocuments(filterOption);

             // Truy vấn sản phẩm dựa vào filterOption và sortOption, với phân trang skip và limit
             const products = await Product.find(filterOption)
                 .sort(sortOption)
                 .skip(skip)
                 .limit(limit);
            console.log('products',products);
            
            return resolve({
                status: 200,
                message: "Lấy thành công danh sách sản phẩm",
                data: products,
                total: totalProduct,
                pageCurrent: Math.ceil(skip / limit) + 1,
                totalPage: Math.ceil(totalProduct / limit),
            });
        } catch (error) {
            return reject(error);
        }
    });
};

const getAllProductApp = async (req,res) => {
    return new Promise(async(resolve,reject) => {
        try {
            const totalProduct = await Product.countDocuments();
            
            const allProduct = await Product.find();
            resolve({
                status: 200,
                message: "Lấy thành công danh sách product",
                data: allProduct,
                total: totalProduct,
            });
        } catch (error) {
            reject(error);
        }
    })
}

const getDetailProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const product = await Product.findById(id);

            if (!product) {
                return resolve({
                    status: 404,
                    message: "Không có sản phẩm trong database"
                });
            }

            return resolve({
                status: 200,
                message: "Lấy thông tin sản phẩm thành công",
                data: product
            });
        } catch (error) {
            return reject(error);
        }
    });
};
const getAllType = () => {
    return new Promise(async(resolve,reject) => {
        try {
                const allType = await Product.distinct('type');

                resolve({
                    status: 200,
                    message: "Lấy thành công danh sách Type",
                    data: allType,
            });
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
    getAllProduct,
    getAllProductApp,
    getAllType
};

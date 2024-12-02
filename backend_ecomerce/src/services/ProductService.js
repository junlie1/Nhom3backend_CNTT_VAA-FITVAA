const { getType } = require('../controllers/ProductController');
const Product = require('../models/ProductModel');

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

            const createdProduct = await Product.create({
                name, 
                image, 
                type, 
                price, 
                countInStock,
                rating,
                description
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

const getAllProduct = (limit, page, sort, filter) => {
    return new Promise(async (resolve, reject) => {
        try {
            const totalProduct = await Product.find()
            let allProduct = []
            if (filter) {
                const label = filter[0];
                const allObjectFilter = await Product.find({ [label]: { '$regex': filter[1] } }).limit(limit).skip(page * limit).sort({createdAt: -1, updatedAt: -1})
                resolve({
                    status: 'OK',
                    message: 'Success',
                    data: allObjectFilter,
                    total: totalProduct,
                    pageCurrent: Number(page + 1),
                    totalPage: Math.ceil(totalProduct / limit)
                })
            }
            if (sort) {
                const objectSort = {}
                objectSort[sort[1]] = sort[0]
                const allProductSort = await Product.find().limit(limit).skip(page * limit).sort(objectSort).sort({createdAt: -1, updatedAt: -1})
                resolve({
                    status: 'OK',
                    message: 'Success',
                    data: allProductSort,
                    total: totalProduct,
                    pageCurrent: Number(page + 1),
                    totalPage: Math.ceil(totalProduct / limit)
                })
            }
            if(!limit) {
                allProduct = await Product.find().sort({createdAt: -1, updatedAt: -1})
            }else {
                allProduct = await Product.find().limit(limit).skip(page * limit).sort({createdAt: -1, updatedAt: -1})
            }
            resolve({
                status: 'OK',
                message: 'Success',
                data: allProduct,
                total: totalProduct,
                pageCurrent: Number(page + 1),
                totalPage: Math.ceil(totalProduct / limit)
            })
        } catch (e) {
            reject(e)
        }
    })
}

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
                data: product
            })
        } catch (error) {
            reject(error);
        }
    })
}

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
    getAllType
};
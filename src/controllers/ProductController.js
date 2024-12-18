const ProductService = require('../services/ProductService');
const removeAccents = require('remove-accents');
const createProduct = async (req,res) => {
    try {
        const {name, image, type, price, countInStock,rating,description} = req.body;
        
        if(!name || !image || !type || !price || !countInStock || !rating || !description) {
            return res.status(500).json({
                status: "error",
                message: "Các trường dữ liệu là bắt buộc"
            });
        }
        //Truyền req.body sang UserService gán vào newUser
        const response = await ProductService.createProduct(req.body);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(404).json({
            mesage: error
        });
    }
}

const updateProduct = async (req,res) => {
    try {
        const productId = req.params.id;
        console.log(productId);
        
        const data = req.body;
        if(!productId) {
            return res.status(404).json({
                status: "error",
                message: "Không tìm thấy sản phẩm"
            });
        }
        
        //Truyền req.body sang UserService gán vào newUser
        const response = await ProductService.updateProduct(productId,data);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(404).json({
            mesage: error
        });
    }
}

const deleteProduct = async (req,res) => {
    try {
        const productId = req.params.id;
        if(!productId) {
            return res.status(404).json({
                status: "error",
                message: "Không tìm thấy sản phẩm"
            });
        }
        
        //Truyền req.body sang UserService gán vào newUser
        const response = await ProductService.deleteProduct(productId);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(404).json({
            mesage: error
        });
    }
}

const getAllProduct = async (req,res) => {
    try {
        const { limit = 8, page = 0, sort = '', filter = '', search = '' } = req.query;  // thêm search //

        let sortOption = {};
        let filterOption = {};


        // Sắp xếp
        // Xác định tiêu chí sắp xếp
        if (sort === 'price_asc') {
            sortOption = { price: 1 }; // Giá tăng dần
        } else if (sort === 'price_desc') {
            sortOption = { price: -1 }; // Giá giảm dần
        } else if (sort === 'rating_desc') {
            sortOption = { rating: -1 }; // Đánh giá cao nhất
        }

``
            // Lọc
            if (filter.trim() !== '') {
                filterOption.type = { $regex: filter.trim(), $options: 'i' }; // Không phân biệt chữ hoa/thường
            }

            // Phân trang
            const skip = page * limit;

            if (search.trim() !== '') {
                const normalizedSearch = removeAccents(search.trim().toLowerCase()); // Loại bỏ dấu
                console.log('normalizedSearch',normalizedSearch);
                
                filterOption.$or = [
                    { nameNormalized: { $regex: normalizedSearch, $options: 'i' } },
                    { descriptionNormalized: { $regex: normalizedSearch, $options: 'i' } },
                ];
            }

            const response = await ProductService.getAllProduct(filterOption, sortOption, skip, Number(limit));
            return res.status(200).json(response);
        } catch (error) {
            console.error("Lỗi", error);    
        return res.status(404).json({
            message: error
        });
    }
}

getAllProductType = async (req,res) => {
    try {
        const {limit,page, sort, filter} = req.query;
        //Truyền req.body sang UserService gán vào newUser
        const response = await ProductService.getAllProductType(Number(limit) || 8,Number(page) || 0 , sort , filter);
        return res.status(200).json(response);
    } catch (error) {
        console.error("Lỗi", error);
        
        
        return res.status(404).json({
            mesage: error
        });
    }
}
const getAllProductApp = async (req,res) => {
    try {
        //Truyền req.body sang UserService gán vào newUser
        const response = await ProductService.getAllProductApp();
        return res.status(200).json(response);
    } catch (error) {
        console.error("Lỗi", error);
        
        
        return res.status(404).json({
            mesage: error
        });
    }
}
const getDetailProduct = async (req,res) => {
    try {
        const productId = req.params.id;
        if(!productId) {
            return res.status(404).json({
                status: "error",
                message: "Không tìm thấy sản phẩm"
            });
        }
        
        //Truyền req.body sang UserService gán vào newUser
        const response = await ProductService.getDetailProduct(productId);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(404).json({
            mesage: error
        });
    }
}
const getAllType = async (req,res) => {
    try {
        const response = await ProductService.getAllType();
        return res.status(200).json(response);
    } catch (error) {
        console.error("Lỗi", error);
        
        
        return res.status(404).json({
            mesage: error
        });
    }
}

module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    getDetailProduct,
    getAllProduct,
    getAllProductApp,
    getAllType,
    getAllProductType
};
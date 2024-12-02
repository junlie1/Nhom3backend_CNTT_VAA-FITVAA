const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    name: { type: String, required: true, unique: true },
    nameNormalized: { type: String }, // Tên không dấu
    image: { type: String, required: true },
    type: { type: String, required: true },
    price: { type: Number, required: true },
    countInStock: { type: Number, required: true },
    rating: { type: Number, required: true },
    description: { type: String, required: true },
    descriptionNormalized: { type: String },
    discount: {type: Number},
    selled: {type: Number}
}, {
    // createAt&updateAt
    timestamps: true
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
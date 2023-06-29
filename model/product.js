const { Schema, model } = require('mongoose');

const productSchema = new Schema({
    id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
    },
    productCode: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        default: 1
    },
    price: {
        type: Number,
        required: true,
    },
    metric: {
        type: String,
        required: true,
    },
});

module.exports = model('product', productSchema);

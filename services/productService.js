const { handleSuccessResponse, handleErrorResponse } = require('../utils/responseHandler');
const Product = require('../model/product');
const { httpStatus } = require('../constants');


async function getProducts(req, res) {
    try {
        handleSuccessResponse(res, await Product.find({} ));
    } catch (error) {
        handleErrorResponse(res, httpStatus.INTERNAL_SERVER_ERROR, error);
    }
}

async function postProduct(req, res) {
    try {
        const input = req.body; // Assuming product data is passed in the request body
        const product = await Product.create(input);
        handleSuccessResponse(res, product);
    } catch (error) {
        handleErrorResponse(res, httpStatus.INTERNAL_SERVER_ERROR, error);
    }
}

async function putProduct(req, res) {
    try {
        const productId = req.params.id; // Assuming the product ID is passed as a route parameter
        const input = req.body; // Assuming updated product data is passed in the request body
        const updatedProduct = await Product.findByIdAndUpdate(productId, input, { new: true });
        handleSuccessResponse(res, updatedProduct);
    } catch (error) {
        handleErrorResponse(res, httpStatus.INTERNAL_SERVER_ERROR, error);
    }
}

async function getProductById(req, res) {
    try {
        const productId = req.params.id; // Assuming the product ID is passed as a route parameter
        const product = await Product.findById(productId);
        if (!product) {
            handleErrorResponse(res, httpStatus.NOT_FOUND, 'Product not found');
            return;
        }
        handleSuccessResponse(res, product);
    } catch (error) {
        handleErrorResponse(res, httpStatus.INTERNAL_SERVER_ERROR, error);
    }
}

async function deleteProduct(req, res) {
    try {
        const productId = req.params.id; // Assuming the product ID is passed as a route parameter
        const product = await Product.findByIdAndDelete(productId);
        if (!product) {
            handleErrorResponse(res, httpStatus.NOT_FOUND, 'Product not found');
            return;
        }
        handleSuccessResponse(res, product);
    } catch (error) {
        handleErrorResponse(res, httpStatus.INTERNAL_SERVER_ERROR, error);
    }
}

module.exports = {
    getProducts,
    getProductById,
    postProduct,
    putProduct,
    deleteProduct
};

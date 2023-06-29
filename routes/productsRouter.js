const express = require('express');
const { getProducts, getProductById, postProduct, putProduct, deleteProduct } = require('../services/productService');
const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', postProduct);
router.put('/:id', putProduct);
router.delete('/:id', deleteProduct);

module.exports = router;

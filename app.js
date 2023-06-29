require('dotenv').config();
require('./config/database').connect();
const express = require('express');
const { verifyToken, login, register } = require('./services/authenticationService');
const { httpStatus } = require('./constants');
const { handleSuccessResponse, handleErrorResponse, generateError } = require('./utils/responseHandler');
const { postClient, getClientById, putClient, deleteClient, getClientByEmailOrGetAll } = require('./services/clientService');
const { getProducts, getProductById, postProduct, putProduct, deleteProduct } = require('./services/productService');
const app = express();

app.use(express.json());

app.post('/register', register);
app.post('/login', login);
app.get('/home', verifyToken, (req, res) => {
    handleSuccessResponse(res, { message: 'OK' });
});

/**
 * Clients routes
 */
app.post('/clients', postClient);
app.get('/clients/:id', getClientById);
app.get('/clients', getClientByEmailOrGetAll);
app.put('/clients/:id', putClient);
app.delete('/clients/:id', deleteClient);

/**
 * Products routes
 */
app.get('/products', getProducts);
app.get('/products/:id', getProductById);
app.post('/products', postProduct);
app.put('/products/:id', putProduct);
app.delete('/products/:id', deleteProduct);
//page not found handler
app.use('*', (req, res) => {
    handleErrorResponse(res, httpStatus.NOT_FOUND, generateError('Page not found'));
});

module.exports = app;

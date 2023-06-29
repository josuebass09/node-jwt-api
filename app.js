require('dotenv').config();
require('./config/database').connect();
const express = require('express');
const { verifyToken } = require('./services/authenticationService');
const { httpStatus } = require('./constants');
const { handleSuccessResponse, handleErrorResponse, generateError } = require('./utils/responseHandler');
const clientsRouter = require('./routes/clientsRouter');
const productsRouter = require('./routes/productsRouter');
const authRouter = require('./routes/authRouter');
const app = express();

app.use(express.json());

app.use('/', authRouter);
app.get('/home', verifyToken, (req, res) => {
    handleSuccessResponse(res, { message: 'OK' });
});

/**
 * Clients routes
 */
app.use('/clients', clientsRouter);

/**
 * Products routes
 */
app.use('/products', productsRouter);


//page not found handler
app.use('*', (req, res) => {
    handleErrorResponse(res, httpStatus.NOT_FOUND, generateError('Page not found'));
});

module.exports = app;

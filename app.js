require('dotenv').config();
require('./config/database').connect();
const express = require('express');
const { verifyToken, login, register } = require('./services/authenticationService');
const { httpStatus } = require('./constants');
const { handleSuccessResponse, handleErrorResponse, generateError } = require('./utils/responseHandler');
const app = express();

app.use(express.json());

app.post('/register', register);
app.post('/login', login);
app.get('/home', verifyToken, (req, res) => {
    handleSuccessResponse(res, { message: 'OK' });
});
//page not found handler
app.use('*', (req, res) => {
    handleErrorResponse(res, httpStatus.NOT_FOUND, generateError('Page not found'));
});

module.exports = app;

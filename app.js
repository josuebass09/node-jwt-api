require('dotenv').config();
require('./config/database').connect();
const express = require('express');
const { verifyToken, login, register } = require('./services/authenticationService');
const { httpStatus } = require('./constants');
const { handleSuccessResponse, handleErrorResponse, generateError } = require('./utils/responseHandler');
const { postClient, getClientById, putClient, deleteClient, getClientByEmailOrGetAll } = require('./services/clientService');
const app = express();

app.use(express.json());

app.post('/register', register);
app.post('/login', login);
app.get('/home', verifyToken, (req, res) => {
    handleSuccessResponse(res, { message: 'OK' });
});

app.post('/client', postClient);
app.get('/client/:id', getClientById);
app.get('/client', getClientByEmailOrGetAll);
app.put('/client/:id', putClient);
app.delete('/client/:id', deleteClient);
//page not found handler
app.use('*', (req, res) => {
    handleErrorResponse(res, httpStatus.NOT_FOUND, generateError('Page not found'));
});

module.exports = app;

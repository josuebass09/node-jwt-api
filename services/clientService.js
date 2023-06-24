const Client = require('../model/client');
const { handleSuccessResponse, handleErrorResponse, generateError } = require('../utils/responseHandler');
const { httpStatus } = require('../constants');
const { validatePostClient } = require('../utils/validator');
async function postClient(req, res) {
    try {
        const input = req.body;
        const validation = validatePostClient(input);

        if (!validation.isValid) {
            handleErrorResponse(res, httpStatus.BAD_REQUEST, generateError(`${validation.field} is required`));
        }
        //TODO: IT'S PENDING TO RETRIEVE THE userId from the session and add it into the clientEntity
        const client = await Client.create(input);
        handleSuccessResponse(res, client);
    } catch (error) {
        handleErrorResponse(res, httpStatus.INTERNAL_SERVER_ERROR, error);
    }
}
async function getClientById(req, res) {
    try {
        const foundClient = await Client.findById(req.params.id);
        handleSuccessResponse(res, foundClient);
    } catch (error) {
        handleErrorResponse(res, httpStatus.INTERNAL_SERVER_ERROR, error);
    }
}

async function getClientByEmailOrGetAll(req, res) {
    const email = req.query.email;
    try {
        handleSuccessResponse(res, await Client.find(email ? { email } : {} ));
    } catch (error) {
        handleErrorResponse(res, httpStatus.INTERNAL_SERVER_ERROR, error);
    }
}

async function putClient(req, res) {
    try {
        const input = req.body;
        //TODO: ADD THE VALIDATOR FUNCTION FOR THIS FUNCTION
        const updatedClient = await Client.findByIdAndUpdate(req.params.id, input, {
            new: true,
        });
        handleSuccessResponse(res, updatedClient);
    } catch (error) {
        handleErrorResponse(res, httpStatus.INTERNAL_SERVER_ERROR, error);
    }
}
async function deleteClient(req, res) {
    try {
        const isDeleted = await Client.findByIdAndRemove(req.params.id);
        handleSuccessResponse(res, isDeleted);
    } catch (error) {
        handleErrorResponse(res, httpStatus.INTERNAL_SERVER_ERROR, error);
    }
}

module.exports = {
    getClientById,
    getClientByEmailOrGetAll,
    postClient,
    putClient,
    deleteClient
};





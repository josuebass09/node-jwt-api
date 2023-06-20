const { httpStatus } = require('../constants');
const handleSuccessResponse = (res, body) => {
    return res.status(httpStatus.OK).send(body);
};

const handleErrorResponse = (res, status, error) => {
    const { message } = error;
    return res.status(status).send(message);
};

const generateError = (message, internalCode = null) => {
    return {
        message,
        internalCode
    };
};

module.exports = {
    handleSuccessResponse,
    handleErrorResponse,
    generateError
};

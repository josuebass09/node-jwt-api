const User = require('../model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// eslint-disable-next-line no-undef
const config = process.env;
const { httpStatus, TOKEN_EXPIRATION_TIME, ADMIN } = require('../constants');
const { handleSuccessResponse, handleErrorResponse, generateError } = require('../utils/responseHandler');
const { validateRegister, validateLogin } = require('../utils/validator');

/**
 * Handles the login request.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves once the login process is complete.
 */
const login = async (req, res) => {
    try {
        const input = req.body;
        const validation = validateLogin(input);

        if (!validation.isValid) {
            handleErrorResponse(res, httpStatus.BAD_REQUEST, generateError(`${validation.field} is required`));
        }

        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if(!user) {
            handleErrorResponse(res, httpStatus.BAD_REQUEST, generateError(`${email} was not found`));
        }

        if (user && (await bcrypt.compare(password, user.password))) {
            user.token = jwt.sign(
                { user_id: user._id, email },
                // eslint-disable-next-line no-undef
                process.env.TOKEN_KEY,
                {
                    expiresIn: TOKEN_EXPIRATION_TIME,
                }
            );
            handleSuccessResponse(res, user);
        }

        handleErrorResponse(res, httpStatus.BAD_REQUEST, generateError('Invalid Credentials'));
    } catch (error) {
        handleErrorResponse(res, httpStatus.INTERNAL_SERVER_ERROR, error);
    }
};

/**
 * Verifies the authentication token from the request headers.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {function} next - The next middleware function.
 * @returns {void}
 */
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization.replace('Bearer ', '');

    if (!token) {
        handleErrorResponse(res, httpStatus.FORBIDDEN, generateError('A token is required for authentication'));
    }
    try {
        req.user = jwt.verify(token, config.TOKEN_KEY);
    } catch (err) {
        handleErrorResponse(res, httpStatus.FORBIDDEN, generateError('Invalid token'));
    }

    next();
};

/**
 * Handles the registration request.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves once the registration process is complete.
 */
const register = async (req, res) => {
    try {
        const input = req.body;
        const validation = validateRegister(input);

        if (!validation.isValid) {
            handleErrorResponse(res, httpStatus.BAD_REQUEST, generateError(`${validation.field} is required`));
        }

        const { email, password, first_name, last_name, activity, identifier, environment } = input;

        const oldUser = await User.findOne({ email });

        if (oldUser) {
            handleErrorResponse(res, httpStatus.BAD_REQUEST, generateError('User Already Exist. Please Login'));
        }

        const encryptedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            first_name,
            last_name,
            environment,
            activity,
            identifier,
            email: email.toLowerCase(),
            password: encryptedPassword,
        });

        user.token = jwt.sign(
            { user_id: user._id, email },
            // eslint-disable-next-line no-undef
            process.env.TOKEN_KEY,
            {
                expiresIn: TOKEN_EXPIRATION_TIME,
            }
        );

        handleSuccessResponse(res, user);
    } catch (err) {
        handleErrorResponse(res, httpStatus.INTERNAL_SERVER_ERROR, err);
    }
};

/**
 * Checks if a user is an admin based on their role.
 *
 * @param {Object} user - The user object.
 * @param {string} user.role - The role of the user.
 * @returns {boolean} - Indicates whether the user is an admin or not.
 */
const isAdmin = user => user.role === ADMIN;

module.exports = {
    login,
    verifyToken,
    register
};

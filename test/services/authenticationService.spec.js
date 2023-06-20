const { httpStatus } = require("../../constants");
const {describe, expect, it} = require("@jest/globals");
const {login} = require('../../services/authenticationService');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../../model/user');
describe('login_function', () => {
    //TODO: fix jest to be able to run the tests
    /*it('test_happy_path_valid_credentials', async () => {
        const req = {
            body: {
                email: 'test@test.com',
                password: 'password'
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        const user = {
            _id: "123",
            email: "test@test.com",
            password: await bcrypt.hash("password", 10)
        };
        User.findOne = jest.fn().mockResolvedValue(user);
        jwt.sign = jest.fn().mockReturnValue("token");
        await login(req, res);
        expect(res.status).toHaveBeenCalledWith(httpStatus.OK);
        expect(res.json).toHaveBeenCalledWith({
            _id: user._id,
            email: user.email,
            token: "token"
        });
    });

    // Tests that an error is returned when email is missing
    it("test_edge_case_missing_email", async () => {
        const req = {
            body: {
                password: "password"
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        await login(req, res);
        expect(res.status).toHaveBeenCalledWith(httpStatus.BAD_REQUEST);
        expect(res.json).toHaveBeenCalledWith({
            error: "All input is required"
        });
    });

    // Tests that an error is returned when password is missing
    it("test_edge_case_missing_password", async () => {
        const req = {
            body: {
                email: "test@test.com"
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        await login(req, res);
        expect(res.status).toHaveBeenCalledWith(httpStatus.BAD_REQUEST);
        expect(res.json).toHaveBeenCalledWith({
            error: "All input is required"
        });
    });

    // Tests that an error is returned when an invalid email is provided
    it("test_edge_case_invalid_email", async () => {
        const req = {
            body: {
                email: "invalidemail",
                password: "password"
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        await login(req, res);
        expect(res.status).toHaveBeenCalledWith(httpStatus.BAD_REQUEST);
        expect(res.json).toHaveBeenCalledWith({
            error: "Invalid Credentials"
        });
    });

    // Tests that an error is returned when an invalid password is provided
    it("test_edge_case_invalid_password", async () => {
        const req = {
            body: {
                email: "test@test.com",
                password: "invalidpassword"
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        const user = {
            _id: "123",
            email: "test@test.com",
            password: await bcrypt.hash("password", 10)
        };
        User.findOne = jest.fn().mockResolvedValue(user);
        await login(req, res);
        expect(res.status).toHaveBeenCalledWith(httpStatus.BAD_REQUEST);
        expect(res.json).toHaveBeenCalledWith({
            error: "Invalid Credentials"
        });
    });

    // Tests that an error is returned when user is not found in database
    it("test_edge_case_user_not_found", async () => {
        const req = {
            body: {
                email: "test@test.com",
                password: "password"
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        User.findOne = jest.fn().mockResolvedValue(null);
        await login(req, res);
        expect(res.status).toHaveBeenCalledWith(httpStatus.BAD_REQUEST);
        expect(res.json).toHaveBeenCalledWith({
            error: "Invalid Credentials"
        });
    });

    // Tests that an error is returned when password does not match
    it("test_edge_case_password_does_not_match", async () => {
        const req = {
            body: {
                email: "test@test.com",
                password: "password"
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        const user = {
            _id: "123",
            email: "test@test.com",
            password: await bcrypt.hash("invalidpassword", 10)
        };
        User.findOne = jest.fn().mockResolvedValue(user);
        await login(req, res);
        expect(res.status).toHaveBeenCalledWith(httpStatus.BAD_REQUEST);
        expect(res.json).toHaveBeenCalledWith({
            error: "Invalid Credentials"
        });
    });

    // Tests that an error is returned when token creation fails
    it("test_edge_case_token_creation_fails", async () => {
        const req = {
            body: {
                email: "test@test.com",
                password: "password"
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        const user = {
            _id: "123",
            email: "test@test.com",
            password: await bcrypt.hash("password", 10)
        };
        User.findOne = jest.fn().mockResolvedValue(user);
        jwt.sign = jest.fn().mockImplementation(() => {
            throw new Error();
        });
        await login(req, res);
        expect(res.status).toHaveBeenCalledWith(httpStatus.INTERNAL_SERVER_ERROR);
    });

    // Tests that a 500 error is returned when an error occurs during execution
    it("test_edge_case_error_during_execution", async () => {
        const req = {
            body: {
                email: "test@test.com",
                password: "password"
            }
        };
        const res = {
            status: jest.fn().mockImplementation(() => {
                throw new Error();
            }),
            json: jest.fn()
        };
        await login(req, res);
        expect(res.status).toHaveBeenCalledWith(httpStatus.INTERNAL_SERVER_ERROR);
    });

    // Tests that the response format is correct
    it("test_general_behaviour_response_format", async () => {
        const req = {
            body: {
                email: "test@test.com",
                password: "password"
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        const user = {
            _id: "123",
            email: "test@test.com",
            password: await bcrypt.hash("password", 10)
        };
        User.findOne = jest.fn().mockResolvedValue(user);
        jwt.sign = jest.fn().mockReturnValue("token");
        await login(req, res);
        expect(res.status).toHaveBeenCalledWith(httpStatus.OK);
        expect(res.json).toHaveBeenCalledWith({
            _id: user._id,
            email: user.email,
            token: "token"
        });
    });*/

});

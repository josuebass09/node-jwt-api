/**
 * Validates the registration input based on required fields.
 *
 * @param {Object} input - The input object containing registration data.
 * @param {string} input.email - The email address.
 * @param {string} input.password - The password.
 * @param {string} input.first_name - The first name.
 * @param {string} input.last_name - The last name.
 * @param {string} input.activity - The activity.
 * @param {string} input.identifier - The identifier.
 * @param {string} input.apiKey - The API key.
 * @returns {Object} - An object indicating whether the input is valid and the invalid field (if any).
 */
function validateRegister(input) {
    const requiredFields = ['email', 'password', 'first_name', 'last_name', 'activity', 'identifier', 'apiKey'];

    for (const field of requiredFields) {
        if (!input[field]) {
            return { isValid: false, field };
        }
    }

    return { isValid: true };
}

/**
 * Validates the login input based on required fields.
 *
 * @param {Object} input - The input object containing login data.
 * @param {string} input.email - The email address.
 * @param {string} input.password - The password.
 * @returns {Object} - An object indicating whether the input is valid and the invalid field (if any).
 */
function validateLogin(input) {
    const requiredFields = ['email', 'password'];

    for (const field of requiredFields) {
        if (!input[field]) {
            return { isValid: false, field };
        }
    }

    return { isValid: true };
}

module.exports = {
    validateRegister,
    validateLogin
};


const { Schema, model } = require('mongoose');
const { ROLES, NORMAL, ENVIRONMENTS, DEV } = require('../constants');

const userSchema = new Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, unique: true },
    password: { type: String, required: true },
    token: { type: String },
    phoneNumber: { type: String, default: null },
    role: { type: String, enum: ROLES, default: NORMAL },
    environment: { type: String, enum: ENVIRONMENTS, default: DEV },
    activity: { type: Number, required: true },
    identifier: { type: Number, required: true },
    apiKey: { type: String, required: true }
});

module.exports = model('user', userSchema);

const { Schema, model } = require('mongoose');

const clientSchema = new Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    //TODO: once the userId is retrieved from the session, it should be uncommented
    //userId: { type: Schema.Types.ObjectId, ref: 'user' },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    status: { type: String, required: true },
    createdAt: { type: Date, required: true },
    idType: { type: String, required: true },
    identifier: { type: String, required: true },
    countryCode: { type: String, required: true },
    fax: String,
    provinceCode: String,
    cantonCode: String,
    districtCode: String,
    neighborhoodCode: { type: String },
    activity: String
});

module.exports = model('client', clientSchema);

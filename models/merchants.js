const mongoose = require('mongoose');
const DateOnly = require('mongoose-dateonly')(mongoose);
const config = require('../config');
const merchantSchema = mongoose.Schema({
    name: {
        type: String
    },
    date_of_birth: {
        type: DateOnly
    },
    gender: {
        type: Number
    },
    gaurdian: {
        type: String
    },
    address: {
        address_1: {
            type: String
        },
        address_2: {
            type: String
        },
        address_3: {
            type: String
        },
        address_4: {
            type: String
        },
        district: {
            type: String
        },
        state: {
            type: String
        }

    },
    email: {
        type: String,
        unique: true,
        lowercase: true
    },
    mobile_number: {
        type: Number,
        unique: true
    },
    password: {
        type: String
    },
    is_mobile_number_verified: {
        type: Boolean,
        default: false
    },
    onboard_status: {
        type: Boolean,
        default: true
    },
    onboarded_by: {
        type: String
    },
    onboarded_on: {
        type: Date,
        default: Date.now
    },
    type: {
        type: Number,
        required: true
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

module.exports = mongoose.model(
    config.DATABASE.merchantCollectionName,
    merchantSchema
);

'use strict';

const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId
    },
    tag: {
        type: String
    },
    photoUrl: {
        type: String
    },
    title: {
        type: String
    },
    description: {
        type: String
    },
    phone: {
        type: String
    },
    email: {
        type: String
    },
    createdAt: {
        type: Date
    },
});

ServiceSchema.pre('save', (next) => {
    if (this._doc) {
        const now = new Date();

        if (!this._doc.createdAt) {
            this._doc.createdAt = now;
        }
    }

    next();
});

exports = module.exports = mongoose.model('Service', ServiceSchema);

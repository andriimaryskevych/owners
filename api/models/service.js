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
        type: Date,
        default: Date.now()
    },
});

ServiceSchema.methods = {
    getResource () {
        return {
            id: this.id,
            tag: this.tag,
            photoUrl: this.photoUrl,
            title: this.title,
            description: this.description,
            phone: this.phone,
            email: this.email,
            createdAt: this.createdAt
        };
    }
};

exports = module.exports = mongoose.model('Service', ServiceSchema);

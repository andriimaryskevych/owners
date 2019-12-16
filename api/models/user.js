'use strict';

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String
    },
    password: {
        type: String
    },
    name: {
        type: String
    },
    phone: {
        type: String
    },
    photoUrl: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
});

UserSchema.methods = {
    getResource () {
        return {
            id: this.id,
            email: this.email,
            name: this.name,
            phone: this.phone,
            photoUrl: this.photoUrl,
            createdAt: this.createdAt
        };
    }
};

exports = module.exports = mongoose.model('User', UserSchema);

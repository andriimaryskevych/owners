'use strict';

const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
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

PostSchema.methods = {
    getResource () {
        return {
            id: this.id,
            userId: this.userId.toString(),
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

exports = module.exports = mongoose.model('Post', PostSchema);

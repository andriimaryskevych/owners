'use strict';

const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId
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
            photoUrl: this.photoUrl,
            title: this.title,
            description: this.description,
            createdAt: this.createdAt
        };
    }
};

exports = module.exports = mongoose.model('Post', PostSchema);

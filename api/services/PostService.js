'use strict';

const uuid = require('uuid');
const Post = require('../models/post');
const FileService = require('./FileService');

class PostService {
    async create ({ userId, title, description, email, image }) {
        const photoUrl = `${userId.toString()}/post/image/${uuid.v4()}/${image.originalname}`;
        await FileService.saveFile(photoUrl, image.buffer);

        const post = new Post({ userId, photoUrl, title, description, email });
        await post.save();

        return post.getResource();
    }

    async getById(id) {
        const post = await Post.findById(id);

        if (!post) {
            throw new Error('Post not found');
        }

        return post.getResource();

    }

    async deleteById(id) {
        const deletedPost = await Post.findByIdAndDelete(id);

        if (!deletedPost) {
            throw new Error('Could not delete post');
        }
    }

    async updateById(id, { title, description, userId, image }) {
        let fiedsToUpdate = {};

        if (image) {
            let photoUrl = `${userId}/post/image/${uuid.v4()}/${image.originalname}`;
            await FileService.saveFile(photoUrl, image.buffer);

            fiedsToUpdate.photoUrl = photoUrl;
        }

        if (title) {
            fiedsToUpdate.title = title;
        }

        if (description) {
            fiedsToUpdate.description = description;
        }

        const post = await Post.findByIdAndUpdate(id, fiedsToUpdate, { new: true });

        if (!post) {
            throw new Error('Could not update post');
        }

        return post.getResource();
    }
}

module.exports = new PostService();
'use strict';

const PostService = require('../services/PostService');
let ObjectId = require('mongoose').Types.ObjectId;

module.exports = {
    create: create,
    getById: getById,
    deleteById: deleteById,
    updateById: updateById
};

function create(req, res) {
    const userId = req.userId;

    const title = req.swagger.params.title.value;
    const description = req.swagger.params.description.value;
    const image = req.swagger.params.image.value;

    console.log('Received request to create post with parameters: ', JSON.stringify({ tag, title, description }));

    PostService.create({ userId, title, description, image })
        .then(post => {
            res.json(post);
        })
        .catch(error => {
            console.error(`Error during creating post: ${error.toString()}`);

            res.status(500).json({
                data: {
                    message: 'Failed to create annotation',
                    error: error.toString(),
                    code: 7000
                }
            }
        );
    });
}

function getById(req, res) {
    const postId = req.swagger.params.id.value;

    console.log('Received request to get post by id', postId);

    PostService.getById(postId)
        .then(post => {
            res.json(post);
        })
        .catch(error => {
            console.error(`Error during getting post: ${error.toString()}`);

            res.status(500).json({
                data: {
                    message: 'Failed to get post',
                    error: error.toString(),
                    code: 7000
                }
            });
        });
}

function deleteById(req, res) {
    const postId = req.swagger.params.id.value;

    console.log('Received requst to delete post by id', postId);

    PostService.deleteById(postId)
        .then(() => {
            res.status(204).end();
        })
        .catch(error => {
            console.error(`Error during deleting post: ${error.toString()}`);

            res.status(500).json({
                data: {
                    message: 'Failed to delete post',
                    error: error.toString(),
                    code: 7000
                }
            });
        });
}

function updateById(req, res) {
    const userId = req.userId;

    const id = req.swagger.params.id.value;

    const title = req.swagger.params.title.value;
    const description = req.swagger.params.description.value;
    const image = req.swagger.params.image.value;

    console.log('Received request to update post with parameters: ', JSON.stringify({ title, description }));

    PostService.updateById(id, { userId, title, description, image })
        .then(post => {
            res.json(post);
        })
        .catch(error => {
            console.error(`Error during creating post: ${error.toString()}`);

            res.status(500).json({
                data: {
                    message: 'Failed to create annotation',
                    error: error.toString(),
                    code: 7000
                }
            }
        );
    });
}
'use strict';

const Post = require('../models/post');
const _ = require('lodash');

class FeedService {
    async getFeedData() {
        const posts = await Post.aggregate([{
            "$lookup": {
                "from": "users",
                "localField": "userId",
                "foreignField": "_id",
                "as": "user"
            }
        }]).exec();

        const feed = posts.map(entity => ({
            _id: entity._id,
            createdAt: entity.createdAt,
            userId: entity.userId,
            photoUrl: entity.photoUrl,
            title: entity.title,
            description: entity.description,
            userPhotoUrl: _.get(entity, 'user[0].photoUrl'),
            userName: _.get(entity, 'user[0].name')
        }));

        return feed;
    }
}

module.exports = new FeedService();
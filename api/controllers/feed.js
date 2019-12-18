'use strict';

const FeedService = require('../services/FeedService');

module.exports = {
    getFeed: getFeed
};

function getFeed(req, res) {
    console.log('Received request to get feed data');

    FeedService.getFeedData()
        .then(feedData => {
            res.json(feedData);
        })
        .catch(error => {
            console.error(`Error during getting feed data: ${error.toString()}`);

            res.status(500).json({
                data: {
                    message: 'Failed to get feed data',
                    error: error.toString(),
                    code: 7000
                }
            }
        );
    });
}
'use strict';

const ServiceService = require('../services/ServiceService');
let ObjectId = require('mongoose').Types.ObjectId;

module.exports = {
    create: create
};

function create(req, res) {
    const userId = ObjectId('123456123456123456123456');

    const tag = req.swagger.params.tag.value;
    const title = req.swagger.params.title.value;
    const description = req.swagger.params.description.value;
    const phone = req.swagger.params.phone.value;
    const email = req.swagger.params.email.value;
    const image = req.swagger.params.image.value;

    console.log('Received request to create service with parameters: ', JSON.stringify({ tag, title, description, phone, email }));

    ServiceService.create({ tag, userId, title, description, phone, email }, image)
        .then(service => {
            res.json(service);
        })
        .catch(error => {
            console.error(`Error during creating service: ${error.toString()}`);

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
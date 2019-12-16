'use strict';

const ServiceService = require('../services/ServiceService');
let ObjectId = require('mongoose').Types.ObjectId;

module.exports = {
    create: create
};

function create(req, res) {
    const photoUrl = 'https://will-add-later.com';
    const userId = ObjectId('123456123456123456123456');

    const { tag, title, description, phone, email } = req.swagger.params.service.value;

    console.log('Received request to create service with parameters: ', JSON.stringify({ tag, title, description, phone, email }));

    ServiceService.create({ photoUrl, tag, userId, title, description, phone, email })
        .then(service => {
            res.json(service);
        })
        .catch(err => {
            res.err(err);
        });
}
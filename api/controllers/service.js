'use strict';

const ServiceService = require('../services/ServiceService');
let ObjectId = require('mongoose').Types.ObjectId;

module.exports = {
    create: create,
    getById: getById,
    deleteById: deleteById,
    updateById: updateById
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

function getById(req, res) {
    const serviceId = req.swagger.params.id.value;

    console.log('Received requst to get service by id', serviceId);

    ServiceService.getById(serviceId)
        .then(service => {
            res.json(service);
        })
        .catch(error => {
            console.error(`Error during getting service: ${error.toString()}`);

            res.status(500).json({
                data: {
                    message: 'Failed to get service',
                    error: error.toString(),
                    code: 7000
                }
            });
        });
}

function deleteById(req, res) {
    const serviceId = req.swagger.params.id.value;

    console.log('Received requst to delete service by id', serviceId);

    ServiceService.deleteById(serviceId)
        .then(() => {
            res.status(204).end();
        })
        .catch(error => {
            console.error(`Error during deleting service: ${error.toString()}`);

            res.status(500).json({
                data: {
                    message: 'Failed to delete service',
                    error: error.toString(),
                    code: 7000
                }
            });
        });
}

function updateById(req, res) {
    const userId = ObjectId('123456123456123456123456');

    const id = req.swagger.params.id.value;

    const tag = req.swagger.params.tag.value;
    const title = req.swagger.params.title.value;
    const description = req.swagger.params.description.value;
    const phone = req.swagger.params.phone.value;
    const email = req.swagger.params.email.value;

    const image = req.swagger.params.image.value;

    console.log('Received request to update service with parameters: ', JSON.stringify({ tag, title, description, phone, email }));

    ServiceService.updateById(id, { tag, title, description, phone, email }, userId, image)
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
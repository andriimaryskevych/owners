'use strict';

const Service = require('../models/service');

class ServiceService {
    async create ({ photoUrl, tag, userId, title, description, phone, email }) {
        const service = new Service({ userId, tag, photoUrl, title, description, phone, email });

        try {
            await service.save();
        } catch (err) {
            console.log('Failed to create service.', err);
        }

        return service;
    }
}

module.exports = new ServiceService();
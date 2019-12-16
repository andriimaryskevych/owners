'use strict';

const Service = require('../models/service');

class ServiceService {
    async create ({ photoUrl, tag, userId, title, description, phone, email }) {
        const service = new Service({ userId, tag, photoUrl, title, description, phone, email });

        await service.save();

        return service;
    }
}

module.exports = new ServiceService();
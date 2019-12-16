'use strict';

const uuid = require('uuid');
const Service = require('../models/service');
const FileService = require('./FileService');

class ServiceService {
    async create ({ tag, userId, title, description, phone, email }, image) {
        const photoUrl = `${userId}/service/image/${uuid.v4()}/${image.originalname}`;
        await FileService.saveFile(photoUrl, image.buffer);

        const service = new Service({ userId, tag, photoUrl, title, description, phone, email });
        await service.save();

        return service;
    }
}

module.exports = new ServiceService();
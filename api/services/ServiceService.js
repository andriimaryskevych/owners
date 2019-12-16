'use strict';

const uuid = require('uuid');
const Service = require('../models/service');
const FileService = require('./FileService');

class ServiceService {
    async create ({ tag, userId, title, description, phone, email, image }) {
        const photoUrl = `${userId.toString()}/service/image/${uuid.v4()}/${image.originalname}`;
        await FileService.saveFile(photoUrl, image.buffer);

        const service = new Service({ userId, tag, photoUrl, title, description, phone, email });
        await service.save();

        return service.getResource();
    }

    async getById(id) {
        const service = await Service.findById(id);

        if (!service) {
            throw new Error('Service not found');
        }

        return service.getResource();

    }

    async deleteById(id) {
        const deletedService = await Service.findByIdAndDelete(id);

        if (!deletedService) {
            throw new Error('Could not delete service');
        }
    }

    async updateById(id, { tag, title, description, phone, email, userId, image }) {
        let fiedsToUpdate = {};

        if (image) {
            let photoUrl = `${userId}/service/image/${uuid.v4()}/${image.originalname}`;
            await FileService.saveFile(photoUrl, image.buffer);

            fiedsToUpdate.photoUrl = photoUrl;
        }

        if (tag) {
            fiedsToUpdate.tag = tag;
        }

        if (title) {
            fiedsToUpdate.title = title;
        }

        if (description) {
            fiedsToUpdate.description = description;
        }

        if (phone) {
            fiedsToUpdate.phone = phone;
        }

        if (email) {
            fiedsToUpdate.email = email;
        }

        const service = await Service.findByIdAndUpdate(id, fiedsToUpdate, { new: true });

        if (!service) {
            throw new Error('Could not update service');
        }

        return service.getResource();
    }
}

module.exports = new ServiceService();
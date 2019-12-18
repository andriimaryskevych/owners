'use strict';

const User = require('../models/user');
const uuid = require('uuid');
const FileService = require('./FileService');

class UserService {
    async getUserById(id) {
        const user = await User.findById(id);

        if (!user) {
            throw new Error('User not found');
        }

        return user,getResource();
    }

    async updateById(id, { name, phone, image }) {
        let fiedsToUpdate = {};

        if (image) {
            let photoUrl = `${id}/avatar/image/${uuid.v4()}/${image.originalname}`;
            await FileService.saveFile(photoUrl, image.buffer);

            fiedsToUpdate.photoUrl = photoUrl;
        }

        if (name) {
            fiedsToUpdate.name = name;
        }

        if (phone) {
            fiedsToUpdate.phone = phone;
        }

        const user = await User.findByIdAndUpdate(id, fiedsToUpdate, { new: true });

        if (!user) {
            throw new Error('Could not update user');
        }

        return user.getResource();
    }
}

module.exports = new UserService();
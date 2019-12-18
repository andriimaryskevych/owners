'use strict';

const UserService = require('../services/UserService');

module.exports = {
    getMyInfo: getMyInfo,
    updateMyInfo: updateMyInfo
};

function getMyInfo(req, res) {
    const userId = req.userId;

    console.log('Received request to personal user info by id', userId);

    UserService.getUserById(userId)
        .then(user => {
            res.json(user);
        })
        .catch(error => {
            console.error(`Error during fetching user info: ${error.toString()}`);

            res.status(500).json({
                data: {
                    message: 'Failed to create annotation',
                    error: error.toString(),
                    code: 7000
                }
            });
        });
}

function updateMyInfo(req, res) {
    const userId = req.userId;

    const name = req.swagger.params.name.value;
    const phone = req.swagger.params.phone.value;

    const image = req.swagger.params.image.value;

    console.log('Received request to update personal info with parameters: ', JSON.stringify({ name, phone }));

    UserService.updateById(userId, { name, phone, image })
        .then(user => {
            res.json(user);
        })
        .catch(error => {
            console.error(`Error during updating user profile: ${error.toString()}`);

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
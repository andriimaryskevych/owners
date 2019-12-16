'use strict';

const jwt = require('jsonwebtoken');

module.exports = {
    sign: sign,
    verify: verify
};

const secret = process.env.SECRET;

async function sign(payload) {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, secret, (err, token) => {
            if (err) {
                return reject(err);
            }

            resolve(token);
        });
    });
}

async function verify(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, (err, token) => {
            if (err) {
                return reject(err);
            }

            resolve(token);
        });
    });
}
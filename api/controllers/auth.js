'use strict';

const AuthService = require('../services/AuthService');

module.exports = {
    login: login,
    signup: signup
};

function login(req, res) {
    const { email, password } = req.swagger.params.loginParameters.value;

    console.log('Received login request with parameters', JSON.stringify(email, password));

    AuthService.login({ email, password })
        .then(token => {
            res.json({ token });
        })
        .catch(error => {
            console.error(`Error during logging in: ${error.toString()}`);

            res.status(500).json({
                data: {
                    message: 'Failed to log in',
                    error: error.toString(),
                    code: 7000
                }
            });
        });
}

function signup(req, res) {
    const { email, password, phone } = req.swagger.params.signUpParameters.value;

    console.log('Received signup request with parameters', JSON.stringify(email, password, phone));

    AuthService.signUp({ email, password, phone })
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            console.error(`Error during signing up: ${error.toString()}`);

            res.status(500).json({
                data: {
                    message: 'Failed to sign up',
                    error: error.toString(),
                    code: 7000
                }
            });
        });
}
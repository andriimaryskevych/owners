'use strict';

const User = require('../models/user');
const { sign } = require('../helpers/jwt');

class AuthService {
    async login({ email, password }) {
        const user = await User.findOne({ email });

        if (!user) {
            throw new Error('User not found');
        }

        if (password !== user.password) {
            throw new Error('Invalid credentials');
        }

        const token = await sign({ userId: user.id });

        return token;
    }

    async signUp({ email, password, phone }) {
        const user = new User({ email, password, phone });

        await user.save();
        const token = await sign({ userId: user.id });

        return {
            user: user.getResource(),
            token
        };
    }
}

module.exports = new AuthService();
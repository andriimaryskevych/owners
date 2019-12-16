'use strict';

require('dotenv').config();

const path = require('path');
const SwaggerExpress = require('swagger-express-mw');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { verify } = require('./api/helpers/jwt');

global.appRoot = path.resolve(__dirname);

module.exports = app;

var config = {
  appRoot: __dirname,
  swaggerSecurityHandlers: {
    JWT: async function(req, authOrSecDef, scopesOrApiKey, cb) {
      const authToken = req.headers['authorization'];

      if (!authToken) {
        cb(new Error('Missing auth header'));
      }

      try {
        await verify(authToken);

        cb(null);
      } catch (err) {
        cb(err);
      }
    }
  }
};

SwaggerExpress.create(config, async function(err, swaggerExpress) {
  if (err) { throw err; }

  app.use(express.static(path.resolve(__dirname, 'bucket')));

  swaggerExpress.register(app);

  try {
    await mongoose.connect(process.env.MONGO_CONNECTION_URL);
  } catch (err) {
    console.log('Could not connect to DB');

    process.exit(1);
  }

  var port = process.env.PORT || 10010;
  app.listen(port);
});

'use strict';

require('dotenv').config();

const path = require('path');
const SwaggerExpress = require('swagger-express-mw');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { verify } = require('./api/helpers/jwt');
const { ObjectId } = mongoose.Types;

global.appRoot = path.resolve(__dirname);

module.exports = app;

var config = {
  appRoot: __dirname,
  swaggerSecurityHandlers: {
    JWT: async function(req, authOrSecDef, scopesOrApiKey, cb) {
      const authToken = req.headers['authorization'];

      if (!authToken) {
        return cb(new Error('Missing auth header'));
      }

      try {
        const { userId } = await verify(authToken);

        if (!userId) {
          throw new Error('Token maleformed');
        }

        req.userId = new ObjectId(userId);

        return cb(null);
      } catch (err) {
        return cb(err);
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
    console.log(err);

    process.exit(1);
  }

  var port = process.env.PORT || 10010;
  app.listen(port);
});

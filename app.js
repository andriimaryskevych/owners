'use strict';

require('dotenv').config();

const path = require('path');
const SwaggerExpress = require('swagger-express-mw');
const express = require('express');
const app = express();
const mongoose = require('mongoose');

global.appRoot = path.resolve(__dirname);

module.exports = app;

var config = {
  appRoot: __dirname
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

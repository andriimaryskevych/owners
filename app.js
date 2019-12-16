'use strict';

require('dotenv').config();
global.appRoot = path.resolve(__dirname);

var SwaggerExpress = require('swagger-express-mw');
var app = require('express')();
const mongoose = require('mongoose');

module.exports = app;

var config = {
  appRoot: __dirname
};

SwaggerExpress.create(config, async function(err, swaggerExpress) {
  if (err) { throw err; }

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

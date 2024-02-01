require("dotenv").config;
const compression = require("compression");
const express = require("express");
const { default: helmet } = require("helmet");
const morgan = require("morgan");
const app = express();

//init middlewares
app.use(morgan("dev")); //for development //HTTP request logger middleware for node.js
// app.use(morgan("combined")); //for production example log: ::ffff:127.0.0.1 - - [30/Jan/2024:21:26:22 +0000] "GET / HTTP/1.1" 200 16 "-" "curl/7.84.0"
app.use(helmet()); //Helmet helps secure Express apps by setting HTTP response headers.
app.use(compression()); //The middleware will attempt to compress response bodies for all request that traverse through the middleware

// init db
require('./dbs/init.mongodb')
const { checkOverload } = require("./helpers/check.connect")
checkOverload()

//init routes
app.get("/", (req, res, next) => {
  const strCompress = "Hello Factttttaaa";
  return res.status(200).json({
    message: "Hi",
    metadata: strCompress.repeat(10000),
  });
});

//handling error

module.exports = app;

"use strict";

const mongoose = require("mongoose");
const os = require("os");
const process = require("process");

const _SECONDS = 5000;

//count number of connections
const countConnect = () => {
  const numConnections = mongoose.connections.length;
  console.log(`Number of connections: ${numConnections}`);
  return numConnections;
};

//check overload
const checkOverload = () => {
  setInterval(() => {
    const numberOfConnections = countConnect();
    const numberOfCores = os.cpus().length;
    const memoryUsage = process.memoryUsage().rss;
    //Example: Maximum number of connections based on number of cores
    const maxConnections = numberOfCores * 5; // 1 core can have 5 connections

    console.log(`Active connections: ${numberOfConnections}`);
    console.log(`Memory usage:: ${memoryUsage / 1024 / 1024} MB`);
    if (numberOfConnections > maxConnections) {
      console.error("Connection overload detected!");
      //notify.send(...)
    }
  }, _SECONDS); //Monitor every 5 secs
};
module.exports = {
  countConnect,
  checkOverload,
};

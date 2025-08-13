"use strict";

const winston = require("winston");
const env = process.env.NODE_ENV || "development";

// Define different logging levels for production and development
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

// For development, we want to log everything. For production, only warnings and errors.
const level = () => {
  return env === "development" ? "debug" : "warn";
};

// Define the colors for each log level
const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "white",
};

winston.addColors(colors);

// Define the format of the logs
const format = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`
  )
);

// Define which transports to use (console, file, etc.)
const transports = [
  // Always log to the console
  new winston.transports.Console(),
  // In a real production environment, you would also add file transports:
  // new winston.transports.File({
  //   filename: 'logs/error.log',
  //   level: 'error',
  // }),
  // new winston.transports.File({ filename: 'logs/all.log' }),
];

const logger = winston.createLogger({
  level: level(),
  levels,
  format,
  transports,
});

module.exports = logger;
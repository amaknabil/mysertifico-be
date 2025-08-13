const express = require("express");
const { PORT } = require("./config/env.config");
const db = require('./models');
const router = require("./routes");
const cookieParser = require("cookie-parser");
const CustomError = require("./utils/customError");
const globalErrorHandler = require("./controllers/error.controller");
const logger = require("./config/logger");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/api", router);

// global error handler for non-exist route
app.all("/*splat", (req, res, next) => {
  const error = new CustomError(
    `Cannot find ${req.originalUrl} on the server`,
    404
  );

  next(error);
});

//global error handler
app.use(globalErrorHandler);

// --- New Start Function ---
const startServer = async () => {
  try {
    // 1. Authenticate the database connection
    await db.sequelize.authenticate();
    logger.info("✅ Database connection has been established successfully.");

    // 2. Sync models (optional, good for development)
    await db.sequelize.sync({
      // force: true, // Use with caution: drops tables
      // alter: true,  // Use with caution: alters tables
    });
    logger.info("All models were synchronized successfully.");

    // 3. Start the Express server ONLY after the database is ready
    app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
    });

  } catch (error) {
    logger.error("❌ Unable to start the server:", error);
    process.exit(1); // Exit if the database connection fails
  }
};

// --- Call the function to start everything ---
startServer();

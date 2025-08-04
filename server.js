const express = require("express");
const { PORT } = require("./config/env.config");
const { db } = require("./config/db.config");
const router = require("./routes");
const cookieParser = require("cookie-parser");
const CustomError = require("./utils/customError");
const globalErrorHandler = require("./controllers/error.controller");

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

app.listen(PORT, async () => {
  console.log("Runnig on", PORT);
  try {
    await db.sync({
      // force:true
    });
    console.log("DB connected successfully");
  } catch {
    console.error("Failed to connect to DB");
  }
});

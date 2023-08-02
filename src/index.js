/**
 * Required External Modules
 */

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const { clientOrigins, serverPort } = require("./config/env.dev");
const connectDB = require("./config/db");

const { placesRouter } = require("./v1/routes/places.router");
const { usersRouter } = require("./v1/routes/users.router");
const { reviewsRouter } = require("./v1/routes/reviews.router");
/**
 * App Variables
 */

const app = express();
const apiRouter = express.Router();

/**
 * Connect Database
 */
connectDB();

/**
 *  App Configuration
 */

app.use(helmet());
app.use(cors({ origin: clientOrigins }));
app.use(express.json());

app.use("/api/v1", apiRouter);

apiRouter.use("/places", placesRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/reviews", reviewsRouter);

app.use(function (err, req, res, next) {
  console.log(err);
  res.status(500).send(err.message);
});

/**
 * Server Activation
 */

app.listen(serverPort, () =>
  console.log(`API Server listening on port ${serverPort}`)
);

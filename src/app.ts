import cors from "cors";
import express from "express";
import swaggerUi from "swagger-ui-express";

import swaggerFile from "~/swagger_output.json";

import { router } from "#/routes";
import { createServer } from "#/config/server";
import { isProd, getUri } from "#/config/constants";
import { error } from "#/middlewares/error.middleware";
import { logger } from "#/middlewares/logger.middleware";

const init = () => {
  const app = express();

  if (!isProd()) createServer();

  app.use(logger, cors(), express.json());
  app.use(getUri(), router);

  app.use(error);

  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

  return app;
};

export default init;

import { Router } from "express";

import { notFound } from "#/middlewares/notFound.middleware";

import * as organizationRouter from "./organization.router";

const router = Router();

router.use(organizationRouter.path, organizationRouter.router);

router.all("*", notFound);

export { router };

export { organizationRouter };

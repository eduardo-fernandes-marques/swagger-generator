import { Router, Request, Response, NextFunction } from "express";

import { mapServiceToDomain } from "#/models/organization.model";
import { getEntity } from "#/controllers/organization.controller";

export const path = "/organizations";

export const getEntityEndpoint = () => "/entities/:id";

export const router = Router();

router
  .route(getEntityEndpoint())
  .get(async (request: Request, response: Response, next: NextFunction) => {
    /* 	#swagger.tags = ['Organization']
        #swagger.description = 'Endpoint to get  a specific entity' */

    try {
      const entity = await getEntity(request.params.id);

      /* #swagger.responses[200] = { 
      schema: { "$ref": "#/definitions/Entity" },
      description: "Entity registered successfully." } */
      return response.status(200).json(mapServiceToDomain(entity));
    } catch (error) {
      return next(error);
    }
  });

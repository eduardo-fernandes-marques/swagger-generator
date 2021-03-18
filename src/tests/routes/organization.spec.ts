import nockType from "nock";
import request from "supertest";

import app from "#/app";
import fixtures from "#/config/server/fixtures.json";
import { createServer, Server } from "#/config/server";
import { paths } from "#/services/organization.service";
import { getUri, APPLICATION } from "#/config/constants";
import { Entity } from "#/models/services/organization.model";
import { mapServiceToDomain } from "#/models/organization.model";
import { path, getEntityEndpoint } from "#/routes/organization.router";

describe("routes › organization", () => {
  let { nock, server } = {} as { nock: typeof nockType; server: Server };

  beforeEach(() => {
    const create = createServer([APPLICATION.ORGANIZATION]);

    nock = create.nock;
    server = create.server;
  });

  describe("GET", () => {
    it("organizations/entities/:id › should handle", async (done) => {
      request(app())
        .get(getUri(`${path}/${getEntityEndpoint()}`))
        .expect(200)
        .end((error, response) => {
          if (error) return done(error);

          expect(response.body).toStrictEqual(
            mapServiceToDomain(fixtures.service.organization.entity as Entity)
          );

          done();
        });
    });

    it("organizations/entities/:id › should handle error", async (done) => {
      nock.cleanAll();

      server.ORGANIZATION.get((uri) => uri.includes(paths.entity)).reply(
        500,
        "Internal Server Error"
      );

      request(app())
        .get(getUri(`${path}/${getEntityEndpoint()}`))
        .expect(500)
        .end((error, response) => {
          if (error) return done(error);

          expect(response.text).toBe("Internal Server Error");

          done();
        });
    });
  });
});

import nock, { Scope } from "nock";

import { paths as organizationPaths } from "#/services/organization.service";
import { getApplication, ApplicationType, APPLICATION } from "#/config/constants";

import fixtures from "../server/fixtures.json";

export type Server = {
  [APPLICATION.ORGANIZATION]: Scope;
};

const server = {
  [APPLICATION.ORGANIZATION]: nock(
    getApplication(APPLICATION.ORGANIZATION as ApplicationType),
    { allowUnmocked: true }
  ).persist(),
} as Server;

export const createServer = (
  applications: ApplicationType[] = [
    ...Object.keys(APPLICATION),
  ] as ApplicationType[]
) => {
  if (applications.includes(APPLICATION.ORGANIZATION)) {
    server.ORGANIZATION.get((uri) =>
      uri.includes(organizationPaths.entity)
    ).reply(200, fixtures.service.organization.entity);
  }

  return { nock, server };
};

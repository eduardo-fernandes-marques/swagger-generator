import applicationDev from "~/properties/application-dev.json";

type LogLevel =
  | "silent"
  | "error"
  | "warn"
  | "info"
  | "http"
  | "verbose"
  | "debug"
  | "silly";

export const ENVIROMENT = {
  dev: "dev",
  tst: "tst",
  uat: "uat",
  test: "test",
  prd: "prd",
};

export type Environment = keyof typeof ENVIROMENT;

export const isProd = () => process.env.NODE_ENV === "production";

export const config = {
  apiPath: "api",
  swaggerRoute: "/docs",
  script: process.env.npm_lifecycle_event,
  serverPort: process.env.SERVER_PORT || "8080",
  apiVersion: process.env.MAJOR_VERSION || "v0",
  loggerLevel: process.env.LOGGER_LEVEL || ("debug" as LogLevel),
};

export type ApplicationType = "ORGANIZATION";

export const APPLICATION: { [K in ApplicationType]: K } = {
  ORGANIZATION: "ORGANIZATION",
};

export type Application = {
  url: {
    [key: string]: string;
  };
};

export const getApplication = (application: ApplicationType): string => {
  const devUrl = (applicationDev as Application).url[application.toLowerCase()];

  return process.env[application] || devUrl;
};

export const getUri = (path?: string) =>
  `/${config.apiPath}/${config.apiVersion}/${path || ""}`;

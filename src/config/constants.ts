import EcsMeta from "~/ecs-meta.json";
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
  apiName: EcsMeta.service_name,
  roles: ["developer", "product_owner"],
  script: process.env.npm_lifecycle_event,
  serverPort: process.env.SERVER_PORT || "8080",
  apiVersion: process.env.MAJOR_VERSION || "v0",
  loggerLevel: process.env.LOGGER_LEVEL || ("debug" as LogLevel),
  jaeger: {
    serviceName: process.env.OTEL_JAEGER_SERVICE_NAME || "jaeger-service",
    endpoint: (() => {
      let url: string | URL =
        process.env.OTEL_JAEGER_ENDPOINT || "http://localhost:14268/";

      if (!/^https?:\/\//i.test(url)) {
        url = `http://${url}`;
      }

      url = new URL("/api/traces", url);

      url.port = "14268";

      return url.toString();
    })(),
  },
};

export const ERROR_MESSAGES = {
  INVALID_SEARCH: "Busca inválida",
  INVALID_REQUEST: "Requisição inválida",
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

import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Application } from "express";
import { ClientPaths, ClientSchemas } from "../docs/client.swagger";
import { UserPaths, UserSchemas } from "../docs/users.swagger";
import { OAuthPaths, OAuthSchemas } from "../docs/oauth.swagger";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Auth API",
      version: "1.0.0",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
        oauthBearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        ...UserSchemas,
        ...OAuthSchemas,
        ...ClientSchemas,
      },
    },
    paths: {
      ...UserPaths,
      ...OAuthPaths,
      ...ClientPaths,
    },
  },
  apis: [],
};

const swaggerSpec = swaggerJSDoc(options);

export function swaggerDocs(app: Application, port: number) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

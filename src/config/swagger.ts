import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Application } from "express";
import { UserSchemas } from "../swagger.schema";

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
      },
      schemas: {
        ...UserSchemas,
      },
    },
  },
  apis: ["./src/modules/**/*.ts"], // route fayllardagi JSDoc larni o‘qiydi
};

const swaggerSpec = swaggerJSDoc(options);

export function swaggerDocs(app: Application, port: number) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
}
export const ClientSchemas = {
  Client: {
    type: "object",
    properties: {
      id: { type: "string", example: "64f1c9a3b8c7a7a5e8d99999" },
      name: { type: "string", example: "My Mobile App" },
      client_id: { type: "string", example: "abc123clientid" },
      client_secret: { type: "string", example: "secretXYZ123" },
      redirect_uris: { type: "array", example: ["https://myapp.com/callback"] },
    },
  },
  ClientRegisterDto: {
    type: "object",
    required: ["name", "redirect_uri"],
    properties: {
      name: { type: "string", example: "My Mobile App" },
      redirect_uris: { type: "array", example: ["https://myapp.com/callback"] },
    },
  },
};

export const ClientPaths = {
  "/oauth/clients": {
    post: {
      tags: ["Clients"],
      summary: "Register a new OAuth client",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/ClientRegisterDto" },
          },
        },
      },
      responses: {
        201: {
          description: "Client registered successfully",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Client" },
            },
          },
        },
        400: { description: "Bad Request" },
      },
    },
  },
};

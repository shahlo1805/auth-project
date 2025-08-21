export const UserSchemas = {
  User: {
    type: "object",
    properties: {
      name: {
        type: "string",
        example: "John Doe",
      },
      email: {
        type: "string",
        example: "john@example.com",
      },
    },
  },

  RegisterUser: {
    type: "object",
    required: ["name", "email", "password"],
    properties: {
      name: {
        type: "string",
        example: "John Doe",
      },
      email: {
        type: "string",
        example: "john@example.com",
      },
      password: {
        type: "string",
        example: "strongPassword123",
      },
    },
  },

  LoginUser: {
    type: "object",
    required: ["email", "password"],
    properties: {
      email: {
        type: "string",
        example: "john@example.com",
      },
      password: {
        type: "string",
        example: "strongPassword123",
      },
    },
  },
};

export const UserPaths = {
  "/api/users/register": {
    post: {
      summary: "Register a new user",
      tags: ["Auth"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/RegisterUser" },
          },
        },
      },
      responses: {
        201: {
          description: "User registered successfully",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/User" },
            },
          },
        },
      },
    },
  },

  "/api/users/login": {
    post: {
      summary: "Login user",
      tags: ["Auth"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/LoginUser" },
          },
        },
      },
      responses: {
        200: {
          description: "Login successful",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  token: { type: "string", example: "jwt.token.here" },
                },
              },
            },
          },
        },
      },
    },
  },

  "/api/users/me": {
    get: {
      summary: "Get profile",
      tags: ["User"],
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: "User profile",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/User" },
            },
          },
        },
        401: { description: "Unauthorized" },
      },
    },
  },
};

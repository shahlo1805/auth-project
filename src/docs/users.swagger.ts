export const UserSchemas = {
  User: {
    type: "object",
    properties: {
      id: { type: "string", example: "64f1b28b5a3c2a9c3f4e9d11" },
      name: { type: "string", example: "Shahlo" },
      email: { type: "string", example: "shahlo@example.com" },
    },
  },
  RegisterUserDto: {
    type: "object",
    required: ["name", "email", "password"],
    properties: {
      name: { type: "string", example: "Shahlo" },
      email: { type: "string", example: "shahlo@example.com" },
      password: { type: "string", example: "123456" },
    },
  },
  LoginUserDto: {
    type: "object",
    required: ["email", "password"],
    properties: {
      email: { type: "string", example: "shahlo@example.com" },
      password: { type: "string", example: "123456" },
    },
  },
  LoginResponse: {
    type: "object",
    properties: {
      accessToken: { type: "string", example: "eyJhbGciOi..." },
      refreshToken: { type: "string", example: "def50200..." },
      user: { $ref: "#/components/schemas/User" },
    },
  },
};

export const UserPaths = {
  "/api/users/register": {
    post: {
      tags: ["Users"],
      summary: "Register a new user",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/RegisterUserDto" },
          },
        },
      },
      responses: {
        201: {
          description: "User created successfully",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/User" },
            },
          },
        },
        400: { description: "Bad request" },
      },
    },
  },
  "/api/users/login": {
    post: {
      tags: ["Users"],
      summary: "Login user",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/LoginUserDto" },
          },
        },
      },
      responses: {
        200: {
          description: "Login successful",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/LoginResponse" },
            },
          },
        },
        401: { description: "Unauthorized" },
      },
    },
  },
  "/users/profile": {
    get: {
      tags: ["Users"],
      summary: "Get logged-in user profile",
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
        404: { description: "User not found" },
      },
    },
  },
  "/users": {
    get: {
      tags: ["Users"],
      summary: "Get all users",
      security: [{ bearerAuth: [] }],
      responses: {
        200: {
          description: "List of all users",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: { $ref: "#/components/schemas/User" },
              },
            },
          },
        },
        401: { description: "Unauthorized" },
      },
    },
  },
};

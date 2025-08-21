export const UserSchemas = {
    User: {
        type: "object",
        properties: {
          id: {
            type: "string",
            example: "64fa7e2d5b2f3b6a8d1e8c45",
          },
          name: {
            type: "string",
            example: "John Doe",
          },
          email: {
            type: "string",
            example: "john@example.com",
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
}
}
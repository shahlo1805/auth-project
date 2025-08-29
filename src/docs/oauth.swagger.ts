export const OAuthPaths = {
  "/oauth/authorize": {
    get: {
      summary: "Authorization endpoint",
      description:
        "Issues an authorization code after validating client and user authentication",
      security: [
        {
          bearerAuth: [],
        },
      ],
      parameters: [
        {
          in: "query",
          name: "client_id",
          required: true,
          schema: { type: "string" },
          description: "The client ID obtained during client registration",
        },
        {
          in: "query",
          name: "redirect_uri",
          required: true,
          schema: { type: "string" },
          description: "Redirect URI registered with the client",
        },
        {
          in: "query",
          name: "response_type",
          required: true,
          schema: { type: "string", enum: ["code"] },
          description: "Must be 'code' for authorization code flow",
        },
        {
          in: "query",
          name: "scope",
          schema: { type: "string" },
          description: "Optional scopes (space-separated)",
        },
      ],
      responses: {
        302: {
          description: "Redirects to client with authorization code",
          headers: {
            Location: {
              description: "Redirect URI with code parameter",
              schema: { type: "string" },
              example: "https://client-app.com/callback?code=abc123",
            },
          },
        },
        400: { description: "Invalid request" },
        401: { description: "Unauthorized (missing or invalid token)" },
      },
    },
  },
  "/oauth/token": {
    post: {
      summary: "Token endpoint",
      description: "Exchanges authorization code for access and refresh tokens",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                client_id: { type: "string" },
                client_secret: { type: "string" },
                code: { type: "string" },
                redirect_uri: { type: "string" },
                grant_type: { type: "string", enum: ["authorization_code"] },
              },
              required: [
                "client_id",
                "client_secret",
                "code",
                "redirect_uri",
                "grant_type",
              ],
            },
          },
        },
      },
      responses: {
        200: {
          description: "Token response",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  access_token: { type: "string" },
                  refresh_token: { type: "string" },
                  token_type: { type: "string" },
                  expires_in: { type: "number" },
                },
              },
            },
          },
        },
        400: { description: "Invalid request" },
      },
    },
  },
  "/oauth/userinfo": {
    get: {
      summary: "User info endpoint",
      description: "Returns user profile data based on the access token",
      security: [{ oauthBearerAuth: [] }],
      responses: {
        200: {
          description: "User info",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  sub: { type: "string" },
                  name: { type: "string" },
                  email: { type: "string" },
                },
              },
            },
          },
        },
        401: { description: "Unauthorized" },
      },
    },
  },
};

export const OAuthSchemas = {
  TokenResponse: {
    type: "object",
    properties: {
      access_token: { type: "string" },
      refresh_token: { type: "string" },
      token_type: { type: "string" },
      expires_in: { type: "number" },
    },
  },
};

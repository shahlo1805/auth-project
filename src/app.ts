import express, { Application, Request, Response } from "express";
import cors from "cors";
import { swaggerDocs } from "./config/swagger";
import { ENV } from "./config/env";
import userRoutes from "./modules/user/user.route";
import oauthRoutes from "./modules/oauth/oauth.routes";

const app: Application = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);

app.use("/oauth", oauthRoutes);

app.get("/health", (req, res) => res.json({ ok: true }));

swaggerDocs(app, Number(ENV.PORT) || 3000);

app.get("/", (_req: Request, res: Response) => {
  res.json({ status: "ok" });
});

export default app;

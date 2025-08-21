import express, {Application, Request, Response} from "express";
import cors from "cors";
import {swaggerDocs} from "./config/swagger"; // ✅ nomi to‘g‘ri
import userRoutes from "./modules/user/user.route";
import {ENV} from "./config/env";

const app: Application = express();

app.use(cors());
app.use(express.json());


app.use("/api/users", userRoutes);

// Swagger
swaggerDocs(app, Number(ENV.PORT) || 3000)


app.get("/", (_req: Request, res: Response) => {
    res.json({status: "ok"});
});

export default app;
import { Router } from "express";
import { OAuthController } from "./oauth.controller";
import { validateAuthorizeQuery } from "../../middlewares/validateQuery.middleware";
import { checkAuth } from "../../middlewares/checkToken.middleware";
// import { oauth } from "../../middlewares/oauth.middleware";

const router = Router();

router.get("/authorize", validateAuthorizeQuery,
    checkAuth,
    OAuthController.authorize)
.post("/token", OAuthController.token)
.get("/userinfo", OAuthController.userInfo)
.post("/clients", OAuthController.createClient)

export default router;
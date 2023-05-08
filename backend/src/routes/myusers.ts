import express from "express";
import * as userController from "../controllers/userControl";

const router: express.Router = express.Router();

router.get("/", userController.getAuthenticatedUser);

router.post("/signup", userController.signUp);

router.post("/login", userController.login);

router.post("/logout", userController.logout);

export default router; 
import { Router } from "express";
import passport from "passport";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { login, signup, privado, logout } from "../controller/session.controller.js";

const sessionRouter = Router();

sessionRouter.post("/login", login);
sessionRouter.post("/signup", signup);
sessionRouter.get("/privado", privado);
sessionRouter.post("/logout", logout);


export default sessionRouter;
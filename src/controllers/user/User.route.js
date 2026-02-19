import { Router } from "express";
import passport from "passport";
import * as UserController from "./User.controller.js";
import { authenticate } from "../../middlewares/auth.middleware.js";

const router = Router();

router.route("/google").get(passport.authenticate("google", {
    scope: ["profile", "email"]
}));

router.route("/google/callback").get(
    passport.authenticate("google", { session: false, failureRedirect: "/login-failed" }),
    UserController.googleCallback
);

router.route('/logout').post(authenticate, UserController.logout);

export default router;
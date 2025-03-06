import { Router } from "express";
import { check } from "express-validator";
import { login, register } from "../Controllers/user.controller.js";

const router = Router();

router.post(
    "/register",
    [
        check("name"),
        check("lastName"),
        check("email"),
        check("password"),
        check("role")
    ],
    register
);

router.post(
    "/login",
    [
        check("email"),
        check("password").not().isEmpty(),
    ],
    login
);

export default router;
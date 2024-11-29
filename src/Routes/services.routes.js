import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { createService, getService } from "../Controllers/services.controller.js";

const router = Router();

router.post(
    "/",
    [
        check("name"),
        check("description"),
        check("price"),
        check("category"),
        validarCampos,
        validarJWT,
    ],
    createService
);

router.get(
    "/",
    [
        validarJWT,
    ],
    getService
);

export default router;
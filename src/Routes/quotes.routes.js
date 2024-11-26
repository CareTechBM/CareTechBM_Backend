import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { createQuotes, getQuotes } from "../Controllers/quotes.controller.js";

const router = Router();

router.post(
    "/create",
    [
        check("patientId").isMongoId(),
        check("doctorId").isMongoId(),
        check("appointmentDate"),
        check("state"),
        check("note"),
        validarCampos,
        validarJWT,
    ],
    createQuotes
);

router.get(
    "/",
    [
        validarJWT,
    ],
    getQuotes
);

// router.put(
//     "/:id",
//     [
//         check("id").isMongoId(),
//         validarCampos,
//         validarJWT,
//     ],
//     updateQuotes
// );

export default router;
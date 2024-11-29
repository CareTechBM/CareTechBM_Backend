import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { createPrescription, deletePrescription, getPrescription, updatePrescription } from "../Controllers/prescriptions.controller.js";

const router = Router();

router.post(
    "/",
    [
        check("patientId"),
        check("doctorId"),
        check("note"),
        check("medications"),
        validarCampos,
        validarJWT,
    ],
    createPrescription
);

router.get(
    "/",
    [
        validarJWT,
    ],
    getPrescription
);

router.put(
    "/:id",
    [
        check("patientId"),
        check("doctorId"),
        check("note"),
        check("medications"),
        validarCampos,
        validarJWT,
    ],
    updatePrescription
);

router.delete(
    "/:id",
    [
        validarJWT,
    ],
    deletePrescription
);

export default router;
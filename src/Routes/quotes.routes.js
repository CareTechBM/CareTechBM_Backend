import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { createQuotes, deleteQuotes, getQuotes, updateQuotes, getQuotesByDoctor, getQuotesByDay, getQuotesByPatient } from "../Controllers/quotes.controller.js";

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

router.put(
    "/:id",
    [
        check("id").isMongoId(),
        validarCampos,
        validarJWT,
    ],
    updateQuotes
);

router.delete(
    "/:id",
    [
        check("id").isMongoId(),
        validarJWT,
    ],
    deleteQuotes
);

router.get(
    "/patient/:patientId",
    [
        check("patientId").isMongoId(),
        validarCampos,
        validarJWT,
    ],
    getQuotesByPatient
);

router.get(
    "/day/:date",
    [
        check("date").isISO8601().toDate(),
        validarCampos,
        validarJWT,
    ],
    getQuotesByDay
);

router.get(
    "/doctor/:doctorId",
    [
        check("doctorId").isMongoId(),
        validarCampos,
        validarJWT,
    ],
    getQuotesByDoctor
);


export default router;
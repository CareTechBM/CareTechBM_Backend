import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { createBill, deleteBill, getBill, updateBill } from "../Controllers/bills.controller.js";

const router = Router();

router.post(
    "/",
    [
        check("patientId"),
        check("quotesId"),
        check("service"),
        check("medication"),
        check("total"),
        check("currency"),
        check("paymentType"),
        validarCampos,
        validarJWT,
    ],
    createBill
);

router.get(
    "/",
    [
        validarJWT,
    ],
    getBill
);

router.put(
    "/:id",
    [
        check("patientId"),
        check("quotesId"),
        check("service"),
        check("medication"),
        check("total"),
        check("currency"),
        check("paymentType"),
        validarCampos,
        validarJWT,
    ],
    updateBill
);

router.delete(
    "/:id",
    [
        validarJWT,
    ],
    deleteBill
);

export default router;
import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";

import { addMedicine, deleteMedications, showMedications, updateMedicine } from "./medications.controller.js";

const router = Router();

router.get('/view', validarJWT, showMedications);

router.post(
    "/create",
    [
        check('name', 'the name is required').not().isEmpty(),
        check('description', 'the description is required').not().isEmpty(),
        check('price', 'the price is required').not().isEmpty(),
        check('currency', 'the currency is required').not().isEmpty(),
        check('dateExpiration', 'the dateExpiration is required').not().isEmpty(),
        check('amount', 'the amount is required').not().isEmpty(),
        validarCampos,
        validarJWT,
    ], addMedicine);

router.delete(
    "/delete/:id",
    [
        check("id", "No es un ID valido").isMongoId(),
        validarCampos,
        validarJWT,
    ], deleteMedications);

router.put(
    "/update/:id",
    [
        check("id", "No es un ID valido").isMongoId(),
        validarCampos,
        validarJWT,
    ], updateMedicine);

export default router;
import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";

import { addDoctor, deleteDoctors, showDoctors, updateDoctor } from "../Controllers/doctors.controller.js";

const router = Router();

router.get('/', showDoctors);

router.post(
    "/",
    [
        check('name', 'the name is required').not().isEmpty(),
        check('lastName', 'the lastname is required').not().isEmpty(),
        check('specialty', 'the specialty is required').not().isEmpty(),
        check('collegiate', 'the collegiate is required').not().isEmpty(),
        check('phone', 'the phone is required').not().isEmpty(),
        check('email', 'the email is required').isEmail(),
        validarCampos,
    ], addDoctor);

router.delete(
    "/:id",
    [
        check("id", "No es un ID valido").isMongoId(),
        validarCampos,
    ], deleteDoctors);

router.put(
    "/:id",
    [
        check("id", "No es un ID valido").isMongoId(),
        validarCampos,
    ], updateDoctor);

    export default router;
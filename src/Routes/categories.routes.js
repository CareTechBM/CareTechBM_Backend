import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";

import { addCategory, deleteCategories, showCategories, updateCategory } from "../Controllers/categories.controller.js";

const router = Router();

router.get('/', showCategories);

router.post(
    "/",
    [
        check('name', 'the name is required').not().isEmpty(),
        check('description', 'the description is required').not().isEmpty(),
        validarCampos,
        validarJWT,
    ], addCategory);

router.delete(
    "/:id",
    [
        check("id", "No es un ID valido").isMongoId(),
        validarCampos,
        validarJWT,
    ], deleteCategories);

router.put(
    "/:id",
    [
        check("id", "No es un ID valido").isMongoId(),
        validarCampos,
        validarJWT,
    ], updateCategory);

    export default router;
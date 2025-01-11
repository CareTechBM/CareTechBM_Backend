import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { addFile, deleteFile, showFiles, updateFile, showFilesByPatient } from "../Controllers/files.controller.js";


const router = Router();

router.get('/', validarJWT, showFiles);

router.post(
    '/',
    [
        validarJWT,
        check('patient', 'El ID del paciente es obligatorio').not().isEmpty(),
        check('patient', 'El ID del paciente debe ser válido').isMongoId(),
        check('observation', 'La observación es obligatoria').not().isEmpty(),
        validarCampos,
    ],
    addFile
);

router.put(
    '/:id',
    [
        validarJWT,
        check('id', 'No es un ID válido').isMongoId(),
        check('observation', 'La observación es obligatoria').not().isEmpty(),
        validarCampos,
    ],
    updateFile
);

router.delete(
    '/:id',
    [
        validarJWT,
        check('id', 'No es un ID válido').isMongoId(),
        validarCampos,
    ],
    deleteFile
);

router.get(
    '/patient/:patientId',
    [
        validarJWT,
        check('patientId', 'El ID del paciente debe ser válido').isMongoId(),
        validarCampos,
    ],
    showFilesByPatient
);

export default router;
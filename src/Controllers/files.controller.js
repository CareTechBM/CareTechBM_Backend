import { response, request } from "express";
import User from "../models/users.model.js";
import File from "../Models/files.model.js";


export const addFile = async (req, res) => {
    try {
        const {uid} = req.user;
        const user = await User.findById(uid);

        if(!user.add == true){
            return res.status(400).send("you do not have permissions to add")
        }

        const {patient, observation} = req.body;

        const existFile = await File.findOne({patient})
        if (existFile) {
            return res.status(400).send(`File with the patient already exists.`);
        }

        const file = new File({patient, observation});

        await file.save();

        return res.status(201).send("File added successfully.");
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error. Contact the administrator.");
    }
}

export const showFiles = async (req, res) => {
    try {
        const files = await File.find();
        if (!files.length > 0) {
            return res.status(400).send("The files is not found");
        }

        return res.status(200).json(files);

    } catch (error) {
        console.log(error);
        return res.status(500).send("Error deleting product");
    }
};

export const deleteFile = async (req, res) => {
    try {
        const { id } = req.params;

        const file = await File.findByIdAndDelete(id);
        if (!file) {
            return res.status(404).send("The file does not exist");
        }

        return res.status(200).send("File deleted successfully");
    } catch (error) {
        console.log(error);
        return res.status(500).send("Error deleting product");
    }
};

export const updateFile = async (req, res) => {
    try {
        const { id } = req.params;
        const { uid } = req.user;
        const user = await User.findById(uid);

        if (!user || !user.update) {
            return res.status(403).send("No tienes permisos para actualizar medicamentos.");
        }

        const existingFile = await File.findById(id);
        if (!existingFile) {
            return res.status(404).send("El expediente con el ID proporcionado no existe.");
        }

        const { observation } = req.body;

        await File.findByIdAndUpdate(
            id,
            {
                observation
            }
        );

        return res.status(200).send("Expediente actualizado correctamente.");
    } catch (error) {
        console.error(error);
        return res.status(500).send("Error interno del servidor. Contacta al administrador.");
    }
};

export const showFilesByPatient = async (req, res) => {
    try {
        const { patientId } = req.params;

        // Buscar archivos asociados al paciente
        const files = await File.find({ patient: patientId });

        if (!files.length) {
            return res.status(404).send("No se encontraron archivos para este paciente.");
        }

        return res.status(200).json(files);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Error al obtener el historial del paciente. Contacta al administrador.");
    }
};
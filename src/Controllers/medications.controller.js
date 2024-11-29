import { response, request } from "express";
import User from "../models/users.model.js";
import Medicine from "../Models/medications.model.js"

export const addMedicine = async (req, res) => {
    try {
        const {uid} = req.user;
        const user = await User.findById(uid);

        if(!user.add == true){
            return res.status(400).send("you do not have permissions to add")
        }

        const { name, description, price, currency, dateExpiration, amount} = req.body;

        const nameToUpper = name.toUpperCase();

        const existingMedicine = await Medicine.findOne({ name: nameToUpper });
        if (existingMedicine) {
            return res.status(400).send(`Medicine with the name "${name}" already exists.`);
        }
        
        const medicine = new Medicine({name:nameToUpper, description, price, currency, dateExpiration, amount});

        await medicine.save();

        return res.status(200).send("The medicine added successfully");
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error. Contact the administrator.");
    }
}

export const showMedications = async (req, res) => {
    try {
        const medications = await Medicine.find();
        if (!medications.length > 0) {
            return res.status(400).send("The medications is not found");
        }
        return res.status(200).json(medications)
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error. Contact the administrator.");
    }
}

export const deleteMedications = async (req, res) => {
    try {
        const { id } = req.params;
        const {uid} = req.user;
        const user = await User.findById(uid);

        if(!user.delete == true){
            return res.status(400).send("you do not have permissions to delete")
        }

        const medicine = await Medicine.findByIdAndDelete(id);
        if (!medicine) {
            return res.status(404).send("The medicine does not exist.");
        }

        return res.status(200).send("Medicine deleted successfully");

    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error. Contact the administrator.");
    }
}

export const updateMedicine = async (req, res) => {
    try {
        const { id } = req.params;
        const { uid } = req.user;
        const user = await User.findById(uid);

        if (!user || !user.update) {
            return res.status(403).send("No tienes permisos para actualizar medicamentos.");
        }

        const existingMedicine = await Medicine.findById(id);
        if (!existingMedicine) {
            return res.status(404).send("El medicamento con el ID proporcionado no existe.");
        }

        const { name, description, price, currency, dateExpiration, amount } = req.body;

        await Medicine.findByIdAndUpdate(
            id,
            {
                name: name.toUpperCase(),
                description,
                price,
                currency,
                dateExpiration,
                amount,
            }
        );

        return res.status(200).send("Medicamento actualizado correctamente.");
    } catch (error) {
        console.error(error);
        return res.status(500).send("Error interno del servidor. Contacta al administrador.");
    }
};
import Patient from '../Models/patients.model.js';
import User from "../models/users.model.js";

export const createPatient = async (req, res) => {
    try {

        const { name, lastName, birthdate, sex, address, phone, email } = req.body;
        
        const patient = new Patient({
            name,
            lastName,
            birthdate,
            sex,
            address,
            phone,
            email,
            registrationDate: new Date(),
        });

        await patient.save();

        return res.status(200).send("Patient successfully added");
        
    } catch (e) {
        console.log(e);
        return res.status(500).send("Error creating patient.");
    }
}

export const getPatient = async (req, res) => {
    try {

        const patient = await Patient.find();

        if (!patient) {
            return res.status(400).send("Patient not found");
        }

        return res.status(200).json(patient)

    } catch (e) {
        console.log(e);
        return res.status(500).send("Error getting patients.");        
    }
}

export const updatePatient = async (req, res) => {
    try {
        
        const { id } = req.params;
        const {uid} = req.user;
        const user = await User.findById(uid);

        if (!user.update == true){
            return res.status(400).send("You do not have permissions to update");
        }

        const existPatient = await Patient.findById(id);

        if (!existPatient){
            return res.status(400).send("Patient with ID not found.");
        }

        const { _id, ...rest } = req.body;

        await Patient.findByIdAndUpdate(id, rest );

        return res.status(200).send("Patient update successfully");

    } catch (e) {
        console.log(e);
        return res.status(500).send("Error updating patient.");
    }
}

export const deletePatient = async (req, res) => {
    try {
        
        const { id } = req.params;
        const {uid} = req.user;
        const user = await User.findById(uid);

        if (!user.delete == true){
            return res.status(400).send("You do not have permissions to delete");
        }

        const existPatient = await Patient.findById(id);

        if (!existPatient){
            return res.status(400).send("Patient with ID not found.");
        }

        const patient = await Patient.findByIdAndDelete(id);

        if (!patient){
            return res.status(404).send("The patient does not exist.");
        }

        return res.status(200).send("Patient successfully removed.");

    } catch (e) {
        console.log(e);
        return res.status(500).send("Error deleting patient.");
    }
}
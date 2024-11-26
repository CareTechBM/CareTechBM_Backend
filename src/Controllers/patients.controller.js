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

        if (!patient.length > 0) {
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

        const patient = await Patient.findById(id);

        if (!patient){
            return res.status(400).send("Error de ID");
        }

        const { _id, ...rest } = req.body;

        await Patient.findByIdAndUpdate(id, rest );

        const updatePatient = await Patient.findById(id);

        return res.status(200).send("Patient update successfully" + updatePatient);

    } catch (e) {
        console.log(e);
        return res.status(500).send("Error updating patient.");
    }
}
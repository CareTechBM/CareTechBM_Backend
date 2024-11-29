import Prescription from '../models/prescriptions.model.js';
import User from '../models/users.model.js';

export const createPrescription = async (req, res) => {
    try {
        
        const { patientId, doctorId, note, medicationId, amount, frequency } = req.body;

        const prescription = new Prescription({
            patientId,
            doctorId,
            note,
            medications: {
                medicationId,
                amount,
                frequency,
            },
        });

        await prescription.save();

        return res.status(200).send("Prescription successfully added");

    } catch (e) {
        console.log(e);
        return res.status(500).send("Error creating prescription.");
    }
}

export const getPrescription = async (req, res) => {
    try {
        
        const prescription = await Prescription.find();

        if (!prescription){
            return res.status(400).send("Prescription not found");
        }

        return res.status(200).send(prescription)

    } catch (e) {
        console.log(e);
        return res.status(500).send("Error getting patients.")
    }
}

export const updatePrescription = async (req, res) => {
    try {
        
        const { id } = req.params;
        const {uid} = req.user;
        const user = await User.findById(uid);

        if (!user.update == true){
            return res.status(400).send("You do not have permissions to update");
        }

        const existPrescription = await Prescription.findById(id);

        if (!existPrescription){
            return res.status(400).send("Prescription with ID not found.");
        }

        const { _id, ...rest } = req.body;

        await Prescription.findByIdAndUpdate(id, rest);

        return res.status(200).send("Prescription update successfully");

    } catch (e) {
        console.log(e);
        return res.status(500).send("Error updating prescription.")
    }
}

export const deletePrescription = async (req, res) => {
    try {
        
        const { id } = req.params;
        const {uid} = req.user;
        const user = await User.findById(uid);

        if (!user.delete == true){
            return res.status(400).send("You do not have permissions to delete");
        }

        const existPrescription = await Prescription.findById(id);

        if (!existPrescription){
            return res.status(404).send("Prescription with ID not found.")
        }

        const prescription = await Prescription.findByIdAndDelete(id);

        if (!prescription){
            return res.status(404).send("The prescription does not exist.");
        }

        return res.status(200).send("Prescription successfully removed.");

    } catch (e) {
        console.log(e);
        return res.status(500).send("Error deleting prescription.")
    }
}
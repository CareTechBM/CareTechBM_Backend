import Patient from '../models/patients.model.js';

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
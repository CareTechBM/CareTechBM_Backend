import Doctor from '../Models/doctors.model.js';

export const validarDoctorExists = async (req, res, next) => {
    try {
        const { name, lastName, email } = req.body;

        const existingDoctor = await Doctor.findOne({ name, lastName });

        if (existingDoctor) {
            return res.status(400).send(`Doctor with name "${name} ${lastName}" already exists.`);
        }

        const existEmailDoctor = await Doctor.findOne({ email });
        if (existEmailDoctor) {
            return res.status(400).send(`Doctor with email "${email}" already exists.`);
        }

        next();
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error. Contact the administrator.");
    }
};
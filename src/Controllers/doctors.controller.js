import { response, request } from "express";
import Doctor from "../Models/doctors.model.js";

export const addDoctor = async (req, res) => {
    try {
        const { name, lastName, specialty, collegiate, phone, email } = req.body;

        const doctor = new Doctor({ name, lastName, specialty, collegiate, phone, email });

        await doctor.save();

        return res.status(200).send("The doctor added successfully");

    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error. Contact the administrator.");
    }
}

export const showDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.find();
        if (!doctors.length > 0) {
            return res.status(400).send("The doctors is not found");
        }
        return res.status(200).json(doctors)
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error. Contact the administrator.");
    }
}

export const deleteDoctors = async (req, res) => {
    try {
        const { id } = req.params;

        const doctor = await Doctor.findByIdAndDelete(id);
        if (!doctor) {
            return res.status(404).send("The doctor does not exist.");
        }

        return res.status(200).send("Doctor deleted successfully");

    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error. Contact the administrator.");
    }
}

export const updateDoctor = async (req, res) => {
    try {

        const { id } = req.params;

        const { name, lastName, specialty, collegiate, phone, email } = req.body;

        await Doctor.findByIdAndUpdate({ _id: id, name, lastName, specialty, collegiate, phone, email })

        return res.status(200).send("Doctor deleted successfully");

    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error. Contact the administrator.");
    }
}
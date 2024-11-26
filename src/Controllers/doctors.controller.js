import { response, request } from "express";
import Doctor from "../Models/doctors.model.js";
import User from "../models/users.model.js";

export const addDoctor = async (req, res) => {
    try {

        const {uid} = req.user;
        const user = await User.findById(uid);

        if(!user.add == true){
            return res.status(400).send("you do not have permissions to add")
        }

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
        const {uid} = req.user;
        const user = await User.findById(uid);

        if(!user.view == true){
            return res.status(400).send("you do not have permissions to view")
        }

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
        const {uid} = req.user;
        const user = await User.findById(uid);

        if(!user.delete == true){
            return res.status(400).send("you do not have permissions to delete")
        }

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
        const {uid} = req.user;
        const user = await User.findById(uid);

        if(!user.update == true){
            return res.status(400).send("you do not have permissions to add")
        }

        const existingDoctor = await Doctor.findById(id);
        if (!existingDoctor) {
            return res.status(404).send('Doctor with ID not found.');
        }

        const { name, lastName, specialty, collegiate, phone, email } = req.body;

        await Doctor.findByIdAndUpdate({ _id: id, name, lastName, specialty, collegiate, phone, email })

        return res.status(200).send("Doctor update successfully");

    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error. Contact the administrator.");
    }
}
import Quotes from "../models/quotes.model.js";
import User from "../models/users.model.js";

export const createQuotes = async (req, res) => {
    try {
        
        const { patientId, doctorId, appointmentDate, state, note } = req.body;

        const quotes = new Quotes({
            patientId,
            doctorId,
            appointmentDate,
            state,
            note,
        });

        await quotes.save();

        return res.status(200).send("Appointment added successfully");

    } catch (e) {
        console.log(e);
        return res.status(500).send("Error creating appointment.");
    }
}

export const getQuotes = async (req, res) => {
    try {
        
        const quotes = await Quotes.find();

        if (!quotes.length > 0) {
            return res.status(400).send("Citations not found");
        }

        return res.status(200).json(quotes)

    } catch (e) {
        console.log(e);
        return res.status(500).send("Error displaying appointments.");
    }
}

export const updateQuotes = async (req, res) => {
    try {
        
        const { id } = req.params;
        const {uid} = req.user;
        const user = await User.findById(uid);

        if (!user.update == true){
            return res.status(400).send("You do not have permissions to update");
        }

        const existQuotes = await Quotes.findById(id);
        
        if (!existQuotes){
            return res.status(400).send("Quotes with ID not found.");
        }

        const { _id, ...rest } = req.body;

        await Quotes.findByIdAndUpdate(id, rest);

        return res.status(200).send("Quotes update successfully");

    } catch (e) {
        console.log(e);
        return res.status(500).send("Error updating quotes.");
    }
}

export const deleteQuotes = async (req, res) => {
    try {
        
        const { id } = req.params;
        const {uid} = req.user;
        const user = await User.findById(uid);

        if (!user.delete == true){
            return res.status(400).send("You do not have permissions to delete");
        }

        const existQuotes = await Quotes.findById(id);

        if (!existQuotes){
            return res.status(400).send("Quotes with ID not found.");
        }

        const quotes = await Quotes.findByIdAndDelete(id);

        if (!quotes){
            return res.status(200).send("The quotes does not exist.");
        }

        return res.status(200).send("Quotes successfully removed.");

    } catch (e) {
        console.log(e);
        return res.status(500).send("Error deleting quotes.");
    }
}
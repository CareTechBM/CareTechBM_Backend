import Service from '../models/services.model.js';
import User from '../models/users.model.js';

export const createService = async (req, res) => {
    try {
        
        const { name, description, price, category } = req.body;

        const service = new Service({
            name,
            description,
            price,
            category,
        });

        await service.save();

        return res.status(200).send("Service successfully added");

    } catch (e) {
        console.log(e);
        return res.status(500).send("Error creating service.");
    }
}

export const getService = async (req, res) => {
    try {
        
        const service = await Service.find();

        if (!service){
            return res.status(400).send("Service not found");
        }

        return res.status(200).json(service);

    } catch (e) {
        console.log(e);
        return res.status(500).send("Error getting services.")
    }
}

export const updateService = async (req, res) => {
    try {
        
        const { id } = req.params;
        const {uid} = req.user;
        const user = await User.findById(uid);

        if (!user.update == true){
            return res.status(400).send("You do not have permissions to update");
        }

        const existService = await Service.findById(id);

        if (!existService){
            return res.status(400).send("Service with ID not found.");
        }

        const { _id, ...rest } = req.body;

        await Service.findByIdAndUpdate(id, rest );

        return res.status(200).send("Service update successfully");

    } catch (e) {
        console.log(e);
        return res.status(500).send("Error updating service.");
    }
}

export const deleteService = async (req, res) => {
    try {
        
        const { id } = req.params;
        const {uid} = req.user;
        const user = await User.findById(uid);

        if (!user.delete == true){
            return res.status(400).send("You do not have permissions to delete");
        }

        const existService = await Service.findById(id);

        if (!existService){
            return res.status(400).send("Service with ID not found.");
        }

        const service = await Service.findByIdAndDelete(id);

        if (!service){
            return res.status(404).send("The patient does not exist.");
        }

        return res.status(200).send("Service successfully removed.");

    } catch (e) {
        console.log(e);
        return res.status(500).send("Error deleting service.")
    }
}
import Service from '../models/services.model.js';

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
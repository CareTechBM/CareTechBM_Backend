import Bill from '../models/bill.model.js';
import User from '../models/users.model.js';

export const createBill = async (req, res) => {
    try {
        
        const { patientId, quotesId, servicesId, medicationsId, total, currency, paymentType } = req.body;

        const bill = new Bill({
            patientId,
            quotesId,
            service: {
                servicesId,
            },
            medication: {
                medicationsId,
            },
            total,
            currency,
            paymentType,
            invoiceDate: new Date(),
        });

        await bill.save();

        return res.status(200).send("Bill successfully added");

    } catch (e) {
        console.log(e);
        return res.status(500).send("Error creating bill.");
    }
}

export const getBill = async (req, res) => {
    try {
        
        const bill = await Bill.find();

        if (!bill){
            return res.status(400).send("Bill not found");
        }

        return res.status(200).send(bill);

    } catch (e) {
        console.log(e);
        return res.status(500).send("Error getting bills.");
    }
}

export const updateBill = async (req, res) => {
    try {
        
        const { id } = req.params;
        const {uid} = req.user;
        const user = await User.findById(uid);

        if (!user.update == true){
            return res.status(400).send("You do not have permissions to update");
        }

        const existBill = await Bill.findById(id);

        if (!existBill){
            return res.status(400).send("Bill with ID not found.");
        }

        const { _id, ...rest } = req.body;

        await Bill.findByIdAndUpdate(id, rest);

        return res.status(200).send("Bill update successfully");

    } catch (e) {
        console.log(e);
        return res.status(500).send("Error updating bill.");
    }
}

export const deleteBill = async (req, res) => {
    try {
        
        const { id } = req.params;
        const {uid} = req.user;
        const user = await User.findById(uid);

        if (!user.delete == true){
            return res.status(400).send("You do not have permissions to delete");
        }

        const existBill = await Bill.findById(id);

        if (!existBill){
            return res.status(404).send("Bill with ID not found.");
        }

        const bill = await Bill.findByIdAndDelete(id);

        if (!bill){
            return res.status(404).send("The bill does not exist.");
        }

        return res.status(200).send("Bill successfully removed.");

    } catch (e) {
        console.log(e);
        return res.status(500).send("Error deleting bill.");
    }
}
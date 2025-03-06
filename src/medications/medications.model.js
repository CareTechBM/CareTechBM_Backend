import mongoose, { mongo } from "mongoose";

const MedicineSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        required: true,
        enum: ["QUETZALES", "DOLLARS"]
    },
    dateExpiration: {
        type: Date,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
});

export default mongoose.model('Medication', MedicineSchema);
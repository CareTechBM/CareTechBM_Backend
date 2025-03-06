import mongoose, { Schema } from "mongoose";

const DoctorSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    specialty: {
        type: String,
        required: true
    },
    collegiate: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
})

export default mongoose.model('Doctor', DoctorSchema);
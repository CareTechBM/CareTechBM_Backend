import mongoose, {Schema} from "mongoose";

const PrescriptionSchema = mongoose.Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
        require: true,
    },
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor",
        require: true,
    },
    note: {
        type: String,
        require: false,
    },
    medications: [{
        medicationId: {
            type: String,
            require: true,
        },
        amount: {
            type: Number,
            require: true,
        },
        frequency: {
            type: String,
            require: false,
        }
    }]
})

export default mongoose.model('Prescriptions', PrescriptionSchema);
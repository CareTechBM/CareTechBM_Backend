import mongoose, {Schema} from "mongoose";

const QuotesSchema = mongoose.Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
        required: true,
    },
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor",
        required: true,
    },
    appointmentDate: {
        type: Date,
        required: true,
    },
    state: {
        type: String,
        required: true,
        enum: ["EARRING", "FINALIZED"],
    },
    note: {
        type: String,
        required: false,
    }
})

export default mongoose.model('Quotes', QuotesSchema);
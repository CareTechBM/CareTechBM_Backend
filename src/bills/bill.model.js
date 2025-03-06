import mongoose, {Schema} from "mongoose";

const BillSchema = mongoose.Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
        require: true,
    },
    quotesId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Quotes",
        require: true,
    },
    service: [{
        servicesId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Service",
            require: true,
        }
    }],
    medication: [{
        medicationsId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Medication",
            require: true,
        }
    }],
    total: {
        type: Number,
        require: true,
    },
    currency: {
        type: String,
        require: true,
        enum: ["QUETZALES", "DOLLARS"],
    },
    paymentType: {
        type: String,
        require: true,
        enum: ["CASH", "CARD"],
    },
    invoiceDate: {
        type: Date,
        require: true,
    }
})

export default mongoose.model("Bill", BillSchema);
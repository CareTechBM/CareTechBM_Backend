import mongoose, {Schema} from "mongoose";

const PatientSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    lastName: {
        type: String,
        require: true,
    },
    birthdate: {
        type: Date,
        require: true,
    },
    sex: {
        type: String,
        require: true,
    },
    address: {
        type: String,
        require: true,
    },
    phone: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    registrationDate: {
        type: Date,
        require: true,
    },
    record: {
        type: Number,
        require: true,
    }
})

export default mongoose.model('Patient', PatientSchema);
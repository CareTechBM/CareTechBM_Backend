import mongoose, {Schema} from "mongoose";
import mongooseSequence from "mongoose-sequence";

const AutoIncrement = mongooseSequence(mongoose);

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
        type: String,
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

PatientSchema.plugin(AutoIncrement, { inc_field: "record" });

const Patient = mongoose.model("Patient", PatientSchema);

export default mongoose.model('Patient', PatientSchema);
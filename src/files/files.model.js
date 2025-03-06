import mongoose, { mongo } from "mongoose";

const FilesSchema = mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
    },
    dateCreation: {
        type: Date,
        required: true,
        default: Date.now,
    },
    observation: {
        type: String,
        required: true,
    },
    detail: [
        {
            consultationDate: {
                type: Date,
                required: true
            },
            diagnosis: {
                type: String,
                required: true
            },
            treatment: {
                type: String,
                required: true
            },
            doctor: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Doctor',
            }
        }
    ]
});

export default mongoose.model('File', FilesSchema);
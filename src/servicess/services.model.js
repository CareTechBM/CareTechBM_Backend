import mongoose, { mongo } from "mongoose";

const ServiceSchema = mongoose.Schema({
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
        required: true,
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    }
})

export default mongoose.model('Service', ServiceSchema);
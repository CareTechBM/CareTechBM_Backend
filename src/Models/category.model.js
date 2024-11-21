import mongoose, { mongo } from "mongoose";

const CategorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
})

export default mongoose.model('Category', CategorySchema);
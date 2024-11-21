import mongoose, { Schema } from "mongoose";

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ["ADMINISTRADOR", "USER"],
        default: "USER"
    },
    dateCreation: {
        type: Date
    }
});

UserSchema.methods.toJSON = function () {
    const {_v, password, _id, ...user} = this.toObject();
    user.uid = _id;
    return user;
}

export default mongoose.model('User', UserSchema);
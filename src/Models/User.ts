import mongoose, { Schema, Document, SchemaOptions } from "mongoose";

interface UserDocument extends Document {
    email: string;
    password: string;
    salt: string;
    firstname: string;
    lastname: string;
}

const options: SchemaOptions = {
    toJSON: {
        transform(doc, ret) {
            delete ret.password;
            delete ret.salt;
            delete ret.__v;
            delete ret.createdAt;
            delete ret.updatedAt;
        }
    },
    timestamps: true
}

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    salt: { type: String, required: true },
}, options);

const User = mongoose.model<UserDocument>('user', userSchema);

export default User;



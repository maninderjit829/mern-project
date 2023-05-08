import { InferSchemaType, model, Schema } from "mongoose";

const userSchema = new Schema({
    userName: { type: String, required: true, unique: true },
    // fatherName: { type: String, required: false },
    email: { type: String, required: true, unique: true, select: false },         //select: false hinder the return of email and password when the user retrieve the data
    password: { type: String, required: true, Select: false },

}, { timestamps: true });

type User = InferSchemaType<typeof userSchema>;

export default model<User>("User", userSchema);
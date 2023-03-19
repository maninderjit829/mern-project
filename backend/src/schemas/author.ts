import { InferSchemaType, model, Schema } from "mongoose";

//creating schema 'bookSchema' for our books in better-reads
const authorSchema = new Schema({
    name: { type: String, required: true },
    authorId: { type: Number, require: true },
    description: { type: String, require: false },
});

type Author = InferSchemaType<typeof authorSchema>;

export default model<Author>("Author", authorSchema);
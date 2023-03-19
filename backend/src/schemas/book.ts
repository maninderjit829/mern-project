import { InferSchemaType, model, Schema } from "mongoose";


//creating schema 'bookSchema' for our books in better-reads
const bookSchema = new Schema({
    title: { type: String, required: true },
    // bookId: { type: Number, require: true },
    author: { type: String, required: true },
    isbn: { type: Number },
    description: { type: String },
});

//the following step(s) are necessary in 'Typescript'
type Book = InferSchemaType<typeof bookSchema>;


export default model<Book>("Book", bookSchema);
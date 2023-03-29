import { RequestHandler } from "express";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import BookSchema from "../schemas/book";

/** Endpoint Handler*/
/**Request Handler Functions */
export const getBooks: RequestHandler = async (req, res, next) => {            //It is endpoint for HTTP 'get' request
    //res.send("Hola, madristas!");
    try {
        //throw createHttpError(401)
        // throw Error("Arsenal!!!!!!");
        const books = await BookSchema.find().exec();

        // if (!books) {
        //     throw createHttpError(404, "Endpoint is not defined or couldn't be reached.");
        // }
        // const authors = await AuthorSchema.find().exec();
        res.status(200).json(books);               //HTTP status for signaling 'okay' 
    } catch (error) {
        next(error);
    }

};


export const getaBook: RequestHandler = async (req, res, next) => {
    const bookId = req.params.bookId;
    try {

        if (!mongoose.isValidObjectId(bookId)) {
            throw createHttpError(404, "Invalid object ID.");
        }

        const aBook = await BookSchema.findById(bookId).exec();

        if (!aBook) {
            throw createHttpError(404, "Endpoint is not defined or couldn't be reached.");
        }

        res.status(200).json(aBook);
    } catch (error) {
        next(error);
    }
};


//to declare the type of single feilds in our body
interface CreateBookBody {
    title?: string,
    author?: string,
    description?: string,
    isbn?: Number
}
export const createBook: RequestHandler<unknown, unknown, CreateBookBody, unknown> = async (req, res, next) => {
    const title = req.body.title;
    const author = req.body.author;
    const description = req.body.description;
    const isbn = req.body.isbn;
    try {
        //if the data variables are undefined
        if (!title) {
            throw createHttpError(400, "Book table has a missing variable := title.");
        }
        if (!author) {
            throw createHttpError(400, "Book table has a missing variable := author.");
        }
        const newBook = await BookSchema.create({
            title: title,
            author: author,
            description: description,
            isbn: isbn
        });
        res.status(201).json(newBook);
    } catch (error) {
        next(error);
    }
};


interface updateBookParams {
    bookId: string
}


interface updateBookBody {
    title?: string,
    author?: string
}

export const updateBook: RequestHandler<updateBookParams, unknown, updateBookBody, unknown> = async (req, res, next) => {

    const bookId = req.params.bookId;

    const newTitle = req.body.title;
    const newAuthor = req.body.author;

    try {
        if (!mongoose.isValidObjectId(bookId)) {
            throw createHttpError(404, "Invalid object ID.");
        }
        if (!newTitle) {
            throw createHttpError(400, "Book table has a missing variable := title.");
        }
        if (!newAuthor) {
            throw createHttpError(400, "Book table has a missing variable := author.");
        }

        //fetching the object book by its bookId that was passed as param in the endpoint
        const book = await BookSchema.findById(bookId).exec(); //promise 
        //const bookItem = await = 
        if (!book) {
            throw createHttpError(404, "Endpoint is not defined or couldn't be reached.");
        }

        book.title = newTitle;
        book.author = newAuthor;

        const newBook = await book.save();



        res.status(201).json(newBook);

    } catch (error) {
        next(error);
    }
};

export const deleteBook: RequestHandler = async (req, res, next) => {
    const bookId = req.params.bookId;

    try {
        if (!mongoose.isValidObjectId(bookId)) {
            throw createHttpError(404, "Invalid object ID.");
        }
        // const book = await BookSchema.findById(bookId).exec();
        // if (!book) {
        //     throw createHttpError(404, "This Book didn't exist in your database!");
        // }
        await BookSchema.findByIdAndRemove(bookId);
        res.sendStatus(204);

    } catch (error) {
        next(error);
    }
};
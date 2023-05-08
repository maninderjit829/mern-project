import mongoose from "mongoose";
import UserSchema from "../schemas/user";
import { RequestHandler } from "express";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";


export const getAuthenticatedUser: RequestHandler = async (req, res, next) => {
    const authenticatedUserId = req.session.userId;
    try {
        if (!authenticatedUserId) {
            throw createHttpError(401, "User is not authenticated");
        }
        const user = await UserSchema.findById(authenticatedUserId).select("+email").exec();
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};


interface SignUpBody {
    userName?: string,
    //  fatherName?: string,
    email?: string,
    password?: string,
}

export const signUp: RequestHandler<unknown, unknown, SignUpBody, unknown> = async (req, res, next) => {
    const username = req.body.userName;
    // const fathername = req.body.fatherName;
    const email = req.body.email;
    const passwordRaw = req.body.password;

    try {
        if (!username || !email || !passwordRaw) {
            throw createHttpError(400, "Missing credentials!");
        }

        const existingUser = await UserSchema.findOne({ username: username }).exec();              //.exec() = gives a promise!
        if (existingUser) {
            throw createHttpError(409, "username already exists! Choose different userName.it's a clash!");
        }


        const existingEmail = await UserSchema.findOne({ email: email }).exec();
        if (existingEmail) {
            throw createHttpError(409, "Email already exists. You might want to signUp or go for forget password. ");
        }

        //From here after all the checks made above, we can save our user in the database
        const passwordHash = await bcrypt.hash(passwordRaw, 10);

        const newUser = await UserSchema.create({
            userName: username,
            email: email,
            password: passwordHash,
            // fatherName: fathername,
        });

        //when user has succesfully logged in, we will set up the session as follows:
        req.session.userId = newUser._id;

        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
};

interface LoginBody {
    username?: string,
    password?: string,
}

export const login: RequestHandler<unknown, unknown, LoginBody, unknown> = async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    try {
        if (!username || !password) {
            throw createHttpError(400, "Please fill in all the required fields.");
        }
        const user = await UserSchema.findOne({ username: username }).select("+password +email").exec();

        if (!user) {
            throw createHttpError(401, "Invalid credentials!");
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            throw createHttpError(401, "Invalid credentials!");
        }

        req.session.userId = user._id;
        res.status(201).json(user);

    } catch (error) {
        next(error);
    }
};

export const logout: RequestHandler = (req, res, next) => {
    req.session.destroy(error => {
        if (error) {
            next(error);
        }
        else {
            res.sendStatus(200);
        }
    })
};

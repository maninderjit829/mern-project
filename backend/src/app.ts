/**MIDDLE-WARE */
/** express app initialization and error handling*/
import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import routes from "./routes/index";
import morgan from "morgan";
import createHttpError, { isHttpError } from "http-errors";

//our project(in this case, 'app') is living on express
const app = express();                              //app is basically our server. This is where we relate our endpoints at. 
//The app object is instantiated on creation of the Express server


//setup the logger
//implementation of morgan middleware package to setup the logger
//important during production 
app.use(morgan("dev"));

//define the type of data we post to our server 
app.use(express.json());


/**In the following endpoint that we have set up here, it will look for the endpoints that matches the best. */
app.use("/api/books", routes);


/**Express error handler*/
//Error handler to handle when we don't have set up our routes
//404 not found in production environments
app.use((req, res, next) => {
    next(createHttpError(404, "Endpoints/routes not defined!"));
});


//Error handler (Always at the bottom of the program)
//For internal server error i.e. error occured during code implementation
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
    let errorMessage = "An unknown error occurred.";
    let statusCode = 500;
    // if (error instanceof Error) errorMessage = error.message;
    if ((isHttpError(error))) {
        statusCode = error.status;
        errorMessage = error.message;
    }
    res.status(statusCode).json({ error: errorMessage });
});
export default app;     
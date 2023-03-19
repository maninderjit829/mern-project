/**Database connection */
import app from "./app";
import mongoose from "mongoose";
import env from "./util/validateEnv";

//const port = 4993;
//variable for our port
const port = env.PORT;

/** Connecting project server.js via mongoose package to MongoDB database*/
mongoose.connect(env.MONGO_CONNECTION_STRING) //'!' - eslint puts the non null insertion operator
    .then(() => {
        //define here when the connection is succeeded.
        console.log("Mongoose connected!", "Yay!");
        app.listen(port, () => {
            console.log("ServerLibrary is running on port: ", port);
        });
    })//then 'a promise'
    .catch(console.error);
;





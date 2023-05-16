/**There are times when the server recieves a get request from frontend app, it is possible 
 * that server could throw http errors or there is no data to work with, then our application should 
 * handle this and deal with error handling or bad status codes such as 404, 401. 
 * 
 * 
 */

import { book } from "../models/books";
import { User, User1 } from "../models/user";


//check the fetching of the data from the server 
async function fetchData(input: RequestInfo, init?: RequestInit) {
    const response = await fetch(input, init);
    if (response.ok) {
        return response;
    } else {
        const errorBody = await response.json();
        const errorMessage = errorBody.error;
        throw Error(errorMessage);
    }

}

//Fetching the loggedIn users from the database, 
//makes a 'get' call to the api endpoint: "localhost:4993/api/users"
export async function getLoggedUsers(): Promise<User> {
    const response = await fetchData("/api/users", { method: "GET" });
    return response.json();
}

/**Endpoints for signing up, logging in, and logging out.  */

//signup and signup credentials
export interface signUpCredentials {
    name: string,
    email: string,
    password: string,
    // fathers_name: string,
    // favorite_hobby: string,
}
export async function signUp(credentials: signUpCredentials): Promise<User> {
    const response = await fetchData("/api/users/signup", {
        method: "POST",
        headers: {
            "Content-Type": "applications/json",
        },
        body: JSON.stringify(credentials),
    });
    return response.json();
}


//login and its credentials
export interface loginCredentials {
    name: string,
    password: string
}

export async function login(credentials: loginCredentials): Promise<User1> {
    const response = await fetchData("/api/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "applications/json",
        },
        body: JSON.stringify(credentials),
    });
    return response.json();
}


export async function logout() {
    await fetchData("/api/users/logout", { method: "POST" });
}



export async function fetchBooks(): Promise<book[]> {  //all async function have to return a promise
    const response = await fetchData("/api/books", { method: "GET" });
    return await response.json();
}

export interface BookInput {
    title: string,
    author: string,
    description?: string,
}

export async function createBook(book: BookInput): Promise<book> {
    const response = await fetchData("/api/books",
        {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(book),
        });
    return response.json();
}


export async function updateBook(bookId: string, book: BookInput): Promise<book> {
    const response = await fetchData("/api/books/" + bookId,
        {
            method: "PATCH",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(book),
        });
    return response.json();
}



export async function deleletBook(bookId: string) {
    await fetchData("/api/books/" + bookId, { method: "DELETE" });
}
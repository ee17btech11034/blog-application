import config from "../config/config"

import { Client, Account, ID } from "appwrite";


/*
const client = new Client()
    .setProject(config.appwriteProjectID)
    .setEndpoint(config.appwriteURL);

const account = new Account(client);

try {
    const user = await account.create({
        userId: '[USER_ID]',
        email: 'email@example.com',
        password: '<Password>'
    });
    console.log(user)
} catch (e){
    console.error(e)
}

If we simply write it like this then for all users we will have to expose this code to register level. 
To avaoid this we create a class and object of that class then export that object
*/ 

export class AuthService {
    client = new Client(); //created a client property
    account;

    constructor(){
        this.client.setProject(config.appwriteProjectID) // we called it here bcz it will not be created until a instance is created.
                .setEndpoint(config.appwriteURL);
        this.account = new Account(this.client) // creating a new account of client

    }

    async signupUser({email, password}){
        try {
            //we need user_id unique which we will create we can generate  using            `ID.unique()`
            const user = await this.account.create({
                userId: ID.unique(), // generating here, we can take it from user as well
                email: email,
                password: password,
            });
            // return user; // we can return user right here as well 
            // we can say if account is created then login user right away
            if (user){
                return await this.loginUser({email, password})
            }
        } catch (error) {
            console.log("Error in user signup: ", error)
        }
    }

    async loginUser({email, password}){
        try {
            const result = await this.account.createEmailPasswordSession({email, password});
            return result;
        } catch (error) {
            console.log("Error in user login: ", error)
        }
        
    }

    async isuserLoggedIn(){
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Error in user logged-in check: ", error)
        }
        return null; // to be on safer side
    }

    async logoutUser(){
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            console.log("Error in user logout: ", error)
        }
        return null;
    }
};

const authService = new AuthService();

export default authService;
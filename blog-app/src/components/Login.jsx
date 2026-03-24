import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom'
import {login as authLgoin} from '../store/authSlice'
import CustomButton from './CustomButton'
import CustomInput from './CustomInput'
import { useDispatch } from 'react-redux';
import authService from '../appwrite/auth';
import {useForm} from "react-hook-form"


const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm() // now register and handle submit are keyword of form
    const [error, setError] = useState("")

    const login = async (data) =>{
        setError("") // error clean before every new form
        try {
            const session = await authService.loginUser(data)
            if (session){
                const userData = await authService.isuserLoggedIn()
                if (userData){
                    dispatch(authLgoin(userData))
                }
                navigate("/") // we can programatically send user to a "address"

            }
        } catch (error) {
            setError(error.message)
        }
    }
    return (
        <div>
            <Link></Link>
            <p>
                {error && (<p> {error}</p>)}
            </p>

            // form
            // handleSubmit take a function as argument which it will run
            // register will take care of state of this form automatically
            <form onSubmit={handleSubmit(login)}></form> 
            <div>
                <CustomInput label="Email: " 
                    placeholder="Enter your email"
                    type="email"
                    {...register("email", {
                        required: true,
                        validate: {
                            matchPattern: (value) => /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi.test(value) || "Email must be valid"
                        }
                    })} 
                />

                <CustomInput label="PAssword: " 
                    placeholder="Enter your password"
                    type="password"
                    {...register("password", {
                        required: true,
                        validate: {
                            matchPattern: (value) => /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi.test(value) || "Password must be valid"
                        }
                    })} 
                />
                <CustomButton
                    type='submit' 
                >'Sign In</CustomButton>
            </div>
        </div>
    );
}

export default Login;

/*

// we will have to spread it else it will look for the variable of name "register", 
//  argument must be unique tells that this form is for email
//  arguments a re key, val pair

regex expression can be find https://regexr.com/2rhq7 > comunity

regex.test(value) || "message":
    --> validate the values using regex; if valid then fine else show the message 
*/
import React from 'react';
import { useDispatch } from 'react-redux';
import authService from '../../appwrite/auth'
import {login, logout} from '../../store/authSlice'


const LoginOutbtn = () => {
    const dispatch = useDispatch()
    const logoutHandler = () =>[
        authService.logoutUser().then(()=>{
            dispatch(logout())
        })
    ]
    return (
        <button >
            Logout
        </button>
    );
}

export default LoginOutbtn;

// I can use this btn anywhere as a component
// to let user log in / out we need to access store. 
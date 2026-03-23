import React from 'react';
import { useSelector } from 'react-redux';

import { Link, useNavigate } from 'react-router-dom';
import Container from '../../container/Container';
import LoginOutbtn from './LoginOutbtn';


const Header = () => {
    const authStatus = useSelector((state)=>state.auth.status) // from authslice "name"
    const navigate = useNavigate()

    const navItems = [ // we can run conditional rendering like if logged in show these many options else these many
        {
            name: "Home",
            slug: "/", // we can give any name like path or something, 
            active: true,
        },
        {
            name: "Login",
            slug: "/login",
            active: !authStatus,
        },
        {
            name: "Signup",
            slug: "/signup",
            active: !authStatus,
        },
        {
            name: "All Posts",
            slug: "/all-posts",
            active: authStatus,
        },
        {
            name: "Add Posts",
            slug: "/add-posts",
            active: authStatus,
        },
    ]


    return (
        <header>
            <Container>
                <nav>
                    <div>
                        <Link>
                            <Logo/> // here we can add our logo
                        </Link>
                    </div>

                    // lets loop the remaining
                    <ul>
                        {navItems.map((item)=>(
                            !item.active ? (null) : (<li key={item.name}>
                                <button onClick={()=> navigate(item.slug)}>{item.name}</button> // we can use Link or navigate 
                            </li>)
                        ))}
                        {
                            authStatus && (<li>  // it show if first is true then apply second
                                <LoginOutbtn/>
                            </li>)
                        }
                    </ul>
                </nav>
            </Container>
        </header>
    );
}

export default Header;

// if user is logged in then show only "logout"
// if user is logged out then show only "login/signup"
// or we can create a simple button and use this in loop as well
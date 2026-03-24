import React, {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


export default function ProtectedContainer ({children, authentication=true, }){
    
    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector(state=>state.auth.status)

    useEffect(()=>{
        if (authentication && (authentication !== authStatus)){ // not necessary to use authentication (means no need to take from user) just check with store.
            navigate('/login')
        }
        else if (!authentication && (authentication !== authStatus)){
            navigate('/')
        }

        setLoader(false)
    }, [authStatus, navigate, authentication])


    return ( loader ? <h2> loading </h2> : <h2> loading done</h2>
    );
}

/*




*/
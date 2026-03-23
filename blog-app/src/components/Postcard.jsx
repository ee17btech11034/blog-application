import React from 'react';
import appwriteService from "../appwrite/database"
import { Link } from 'react-router-dom';

const Postcard = ({$id, title, featuredImage}) => { // appwrite take this, like it
    return (
        <Link to={`/post/${$id}`}>
            <div>
                <div>
                    <img src={appwriteService.getpreview(featuredImage)} alt="" />
                </div>
                <h2>{title}</h2>
            </div>
        </Link>
    );
}

export default Postcard;

import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { makeAuthenticatedGETRequest } from "../Utils/ServerHelpers";
import { IoCreateOutline } from "react-icons/io5";

const MyPost = () => {

    const [ postData, setPostData ] = useState([]);


    return (
        <section>
            <div>
                <h1 className="font-bold text-xl">MY POSTS</h1>
                <div>
                    <Link>
                       <button className="flex items-center  border p-2 rounded-md">
                        <IoCreateOutline  /> EDIT</button>
                    </Link>
                </div>
            </div>
            <div>

            </div>
        </section>
    )
}
export default MyPost;
import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { makeAuthenticatedGETRequest } from "../Utils/ServerHelpers";
import { IoCreateOutline } from "react-icons/io5";
import PostCard from "./PostCard";

const MyPost = () => {

    const [ postData, setPostData ] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await makeAuthenticatedGETRequest(
                "/post/get/myposts"
            );
            setPostData(response.data)
        }
        fetchData();
    }, []);


    return (
        <section>
            <div className="flex items-start justify-between mb-6">
                <h1 className="font-bold text-xl">MY POSTS</h1>
                <div>
                    <Link to="/post edit">
                       <button className="flex items-center  border p-2 rounded-md">
                        <IoCreateOutline  /> EDIT</button>
                    </Link>
                </div>
            </div>
            <div className="space-y-4 overflow-auto  ">
            { postData.length > 0 ? (
                    postData.map((item, index) => (
                         <PostCard
                          key={index}
                          user={item.user}
                          image={item.image}
                          description={item.description}
                          postDate={item.postDate} 
                          postTime={item.postTime} 
                          profilePic={item.profilePic}
                          />
                    ))
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </section>
    )
}
export default MyPost;
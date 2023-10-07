import React, { useEffect } from "react";
import { useState } from "react";
import { makeAuthenticatedGETRequest } from "../Utils/ServerHelpers";
import PostCard from "./PostCard";
import { useLocation } from "react-router-dom";

const PublicPost = () => {

    const [ postData, setPostData ] = useState([]);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const userId = queryParams.get("userId");

    useEffect(() => {
        const fetchData = async () => {
            const response = await makeAuthenticatedGETRequest(
                `/post/get/posts/${userId}`
            );
            setPostData(response.data)
        }
        fetchData();
    }, []);


    return (
        <section>
            <div className="flex items-start mb-6">
                <h1 className="font-bold text-xl">MY POSTS</h1>
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
export default PublicPost;
import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { makeAuthenticatedGETRequest } from "../Utils/ServerHelpers";
import { IoCreateOutline } from "react-icons/io5";
import PostCard from "./PostCard";

const MyPost = () => {

    const [ postData, setPostData ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try{
            const response = await makeAuthenticatedGETRequest(
                "/post/get/myposts"
            );
                setPostData(response.data)
                setIsLoading(false)
            } catch(error){
                console.error("Error Fetching posts:", error);
                setIsLoading(false)
            }
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
                {isLoading ? (
                   <div className="min-h-screen flex  justify-center overflow-none">
                      <div className="animate-spin w-20 h-20 border-t-4 border-blue-500 border-solid rounded-full"></div>
                   </div>
                ) : (
                    postData.length > 0 ? (
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
                        <p>You haven't posted any posts yet.</p>
                    )
                )}
            </div>
        </section>
    )
}
export default MyPost;
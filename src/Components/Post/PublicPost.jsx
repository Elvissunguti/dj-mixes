import React, { useEffect } from "react";
import { useState } from "react";
import { makeAuthenticatedGETRequest } from "../Utils/ServerHelpers";
import PostCard from "./PostCard";
import { useLocation } from "react-router-dom";

const PublicPost = () => {

    const [ postData, setPostData ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(true);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const userId = queryParams.get("userId");

    useEffect(() => {
        const fetchData = async () => {
            try{
            const response = await makeAuthenticatedGETRequest(
                `/post/get/posts/${userId}`
            );
                setPostData(response.data);
                setIsLoading(false)
            } catch (error){
                console.error("Error fetching posts of a user:", error);
                setIsLoading(false)
            }
        }
        fetchData();
    }, []);


    return (
        <section>
            <div className="flex items-start mb-6">
                <h1 className="font-bold text-xl">MY POSTS</h1>
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
                        <p>You havent't posted any post yet.</p>
                    )
                )}

            </div>
        </section>
    )
}
export default PublicPost;
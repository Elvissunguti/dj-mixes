import React from "react";
import LoggedInContainer from "../Containers/LoggedInContainer";
import { useState } from "react";
import PostCard from "./PostCard";
import { useEffect } from "react";
import { makeAuthenticatedGETRequest } from "../Utils/ServerHelpers";

const PostPage = () => {

    const [ postData, setPostData ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(true);

    useEffect(() => {
        const getPostData = async () => {
            try{
            const response = await makeAuthenticatedGETRequest(
                "/post/get/posts"
            );
            setPostData(response.data);
            setIsLoading(false);
            } catch(error) {
                console.error("Error fetching my posts:", error);
                setIsLoading(false);
            }
        }
        getPostData();
    }, []);

    

    return (
        <LoggedInContainer curActiveScreen="post page">
            <div className="flex items-start mb-2">
                <h1 className="font-bold text-2xl">POSTS</h1>
            </div>
            <div>
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
                        <p>You haven't posted yet.</p>
                    )
                )}
                
               
            </div>
        </LoggedInContainer>

    )
}
export default PostPage; 
import React, { useState, useEffect } from "react";
import LoggedInContainer from "../Containers/LoggedInContainer";
import PostCard from "./PostCard";
import { makeAuthenticatedGETRequest } from "../Utils/ServerHelpers";

const PostPage = () => {
  const [postData, setPostData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getPostData = async () => {
      try {
        const response = await makeAuthenticatedGETRequest("/post/get/posts");
        setPostData(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setIsLoading(false);
      }
    };
    getPostData();
  }, []);

  return (
    <LoggedInContainer curActiveScreen="post-page">
      <div className="flex items-start mb-6">
        <h1 className="font-bold text-3xl text-primary">Your Posts</h1>
      </div>
      <div className="space-y-6">
        {isLoading ? (
          <div className="flex justify-center items-center min-h-[60vh]">
            <div className="animate-spin w-16 h-16 border-t-4 border-primary border-solid rounded-full"></div>
          </div>
        ) : postData.length > 0 ? (
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
          <div className="text-center py-20 text-gray-500">
            <p>You haven't posted yet.</p>
          </div>
        )}
      </div>
    </LoggedInContainer>
  );
};

export default PostPage;

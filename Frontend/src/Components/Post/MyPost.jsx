import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { makeAuthenticatedGETRequest } from "../Utils/ServerHelpers";
import { IoCreateOutline } from "react-icons/io5";
import PostCard from "./PostCard";

const MyPost = () => {
  const [postData, setPostData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await makeAuthenticatedGETRequest("/post/get/myposts");

        // Sort posts by date (newest first)
        const sortedData = response.data.sort((a, b) => {
          return new Date(b.postDate) - new Date(a.postDate);
        });

        setPostData(sortedData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <section className="p-6 bg-base-100 rounded-lg shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-bold text-2xl text-primary">My Posts</h1>
        <Link to="/post-edit">
          <button className="flex items-center space-x-2 btn btn-outline btn-primary normal-case">
            <IoCreateOutline className="text-lg" />
            <span>Edit</span>
          </button>
        </Link>
      </div>

      {/* Post Feed */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="min-h-[300px] flex justify-center items-center">
            <div className="animate-spin w-12 h-12 border-t-4 border-blue-500 rounded-full"></div>
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
          <p className="text-center text-gray-600">You haven't posted any posts yet.</p>
        )}
      </div>
    </section>
  );
};

export default MyPost;

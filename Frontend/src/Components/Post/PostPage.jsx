import React, { useState, useEffect } from "react";
import LoggedInContainer from "../Containers/LoggedInContainer";
import PostCard from "./PostCard";
import { makeAuthenticatedGETRequest } from "../Utils/ServerHelpers";

const PostPage = () => {
  const [postData, setPostData] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("latest"); // default filter

  useEffect(() => {
    const getPostData = async () => {
      try {
        const response = await makeAuthenticatedGETRequest("/post/get/posts");
        setPostData(response.data);
        sortPosts(response.data, filter);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setIsLoading(false);
      }
    };
    getPostData();
  }, []);

  useEffect(() => {
    sortPosts(postData, filter);
  }, [filter]);

  const sortPosts = (posts, filterType) => {
    const sorted = [...posts].sort((a, b) => {
      const aDateTime = new Date(`${a.postDate} ${a.postTime}`);
      const bDateTime = new Date(`${b.postDate} ${b.postTime}`);
      return filterType === "latest" ? bDateTime - aDateTime : aDateTime - bDateTime;
    });
    setSortedData(sorted);
  };

  return (
    <LoggedInContainer curActiveScreen="post-page">
      <div className="flex items-start justify-between mb-6">
        <h1 className="font-bold text-3xl text-primary">Your Posts</h1>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="ml-4 p-2 border rounded bg-white text-gray-800"
        >
          <option value="latest">Latest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>

      <div className="space-y-6">
        {isLoading ? (
          <div className="flex justify-center items-center min-h-[60vh]">
            <div className="animate-spin w-16 h-16 border-t-4 border-primary border-solid rounded-full"></div>
          </div>
        ) : sortedData.length > 0 ? (
          sortedData.map((item, index) => (
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

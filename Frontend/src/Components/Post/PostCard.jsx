import React from "react";

const PostCard = ({ profilePic, user, image, description, postDate, postTime }) => {
  return (
    <div className="card w-full bg-base-100 shadow-md rounded-lg overflow-hidden mb-6">
      {/* Header */}
      <div className="flex items-center p-4 border-b border-gray-200">
        <img
          src={profilePic}
          alt="Profile pic"
          className="w-12 h-12 rounded-full object-cover mr-3"
        />
        <div>
          <h2 className="font-semibold text-lg text-gray-800 hover:text-green-500 cursor-pointer">
            {user}
          </h2>
          <p className="text-sm text-gray-500">
            {postDate} at {postTime}
          </p>
        </div>
      </div>

      {/* Image */}
      <div className="w-full h-64 overflow-hidden">
        <img
          src={image}
          alt="Post content"
          className="w-full h-full object-cover transition-transform duration-300 transform hover:scale-105"
        />
      </div>

      {/* Description */}
      <div className="p-4">
        <p className="text-gray-700 mb-4">{description}</p>
        <div className="flex justify-between items-center">
          <button className="btn btn-primary btn-sm normal-case">Like</button>
          <button className="btn btn-secondary btn-sm normal-case">Comment</button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;

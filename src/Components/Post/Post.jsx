import React, { useState } from "react";
import NavBar from "../Home/NavBar";
import { makeAuthenticatedMulterPostRequest } from "../Utils/ServerHelpers";
import { useNavigate } from "react-router-dom";

const Post = () => {
  const [ image, setImage ] = useState(null);
  const [ description, setdescription ] = useState("");

  const navigate = useNavigate();

  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    if (imageFile) {
      setImage(imageFile)
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!image || !description){
      console.log("All files required");
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("description", description);

    try{
      const response = await makeAuthenticatedMulterPostRequest(
        "/post/create", formData
      );
      console.log("Server response:", response);
          
      if (response){
        alert("Post created successfully");  
        navigate("/post page")
        console.log("Post Created:", response.createdPost);
      }

    } catch(error){
      console.error("Error creating post:", error);
      alert("Could not Create post");
    }
  };

  


  return (
    <section>
      <div>
        <NavBar />
      </div>
      <div className="flex flex-row items-center justify-center mx-auto max-w-4xl max-w-7xl">
        <form onSubmit={handleFormSubmit}>
          <h1 className="text-2xl font-semibold my-4 ">Post a show or something</h1>
          <div className="relative flex flex-row-reverse items-center justify-center">
            <label for="image" className="px-2 py-2 bg-green-200 cursor-pointer">Choose an Image</label>
            <div>
            <input
              type="file"
              name="image"
              id="image"
              accept="image/*"
              required
              onChange={handleImageChange}
              className="hidden"
            />
            
              {/* Conditionally render the image div */}
              <div className="flex items-center w-56 h-56 justify-center border border-red-500">
                {image ? (
                  <img
                    src={URL.createObjectURL(image)}
                    alt="image of post"
                    required
                    
                    className="h-full w-full object-cover "
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full bg-gray-200">
                    No Image Selected
                  </div>
                )}
              
              </div>
            </div>
          </div>
          <div className="my-4 flex items-center justify-center">
            <label className="text-lg mx-4 font-medium">Description</label>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={(e) => setdescription(e.target.value)}
              placeholder="What is this post about..."
              className=" px-8 py-6 text-xl border border-gray-300 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 "
            />
          </div>
          <div>
            <button
              type="submit"
              className="px-4 py-3 text-white text-xl font-semibold bg-green-400 hover:bg-green-700 cursor-pointer"
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Post;

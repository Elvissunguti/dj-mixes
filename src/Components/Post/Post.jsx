import React, { useState } from "react";
import NavBar from "../Home/NavBar";

const Post = () => {
  const [imageSelected, setImageSelected] = useState(null);
  const [postDescription, setPostDescription] = useState("");

  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    if (imageFile) {
      // Use FileReader to convert the selected image to a data URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSelected(reader.result);
      };
      reader.readAsDataURL(imageFile);
    }
  };

  return (
    <section className="">
      <div>
        <NavBar />
      </div>
      <div className="flex flex-row items-center justify-center mx-auto max-w-4xl max-w-7xl">
        <form>
          <h1 className="text-2xl font-semibold my-4 ">Post a show or something</h1>
          <div className="relative flex flex-row-reverse items-center justify-center">
            <label className="block text-lg font-medium my-4">Post a show</label>
            <div>
            <input
              type="file"
              name="file"
              required
              onChange={handleImageChange}
            />
            
              {/* Conditionally render the image div */}
              <div className="flex items-center w-56 h-56 justify-center border border-red-500">
                {imageSelected ? (
                  <img
                    src={imageSelected}
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
              value={postDescription}
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

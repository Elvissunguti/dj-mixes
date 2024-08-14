import React, { useState } from "react";
import NavBar from "../Home/NavBar";
import {  makeAuthenticatedPOSTRequest } from "../Utils/ServerHelpers";
import { useNavigate } from "react-router-dom";
import {  ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"; 
import { storage } from "../Utils/Firebase";

const Post = () => {
  const [ image, setImage ] = useState(null);
  const [ description, setdescription ] = useState("");
  const [uploading, setUploading] = useState(false);

  const navigate = useNavigate();

  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    if (imageFile) {
      setImage(imageFile)
    }
  };

  const uploadFileToFirebase = (file, path) => {
    return new Promise((resolve, reject) => {
        const storageRef = ref(storage, path);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("Upload is " + progress + "% done");
            },
            (error) => {
                console.error("Upload failed:", error);
                reject(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    resolve(downloadURL);
                });
            }
        );
    });
};

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!image || !description){
      console.log("All files required");
    }

    setUploading(true);

    try{

      const imageUrl = await uploadFileToFirebase(image, `post/image/${image.name}`);

      const formData = {
        imageUrl,
        description
    };

      const response = await makeAuthenticatedPOSTRequest(
        "/post/create", formData
      );
      console.log("Server response:", response);
          
      if (response){
        alert("Post created successfully");  
        navigate("/post page")
      }

    } catch(error){
      console.error("Error creating post:", error);
      alert("Could not Create post");
    } finally {
      setUploading(false);
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
                    alt="post"
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
          <div className="my-4">
                        <button
                            type="submit"
                            className="px-3 py-2 text-white text-xl font-bold bg-green-400 hover:bg-green-700 cursor-pointer"
                            disabled={uploading} // Disable button while uploading
                        >
                            {uploading ? "Uploading..." : "Post"}
                        </button>
                    </div>
        </form>
      </div>
    </section>
  );
};

export default Post;

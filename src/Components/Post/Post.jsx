import React from "react";
import { useState } from "react";
import NavBar from "../Home/NavBar";

const Post = () => {

    const [ imageSelected, setImageSelected ] = useState(null);
    const [ postDescription, setPostDescription ] = useState("");

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

    return(
        <section className="">
            <div>
            <NavBar />
            </div>
            <div className="flex items-center justify-center mx-auto max-w-4xl max-w-7xl">
                <div>
                <h1 className="flex items-center justify-center text-2xl font-semibold ">Post a show or something</h1>
                </div>
                <form>
                    <label>Post a show</label>
                    <input
                    type="file"
                    name="file"
                    required
                    onChange={handleImageChange}
                    />
                    <div className="max-w-[200px] max-h-[200px] border-red-500">
                    { imageSelected && (
                        <div>
                            <img
                            src={imageSelected} 
                            alt="image 0f post"
                            required
                            
                            className=""
                            />
                        </div>
                    )}
                    </div>
                    <div>
                        <label>Description</label>
                        <textarea
                        id="description"
                        name="description"
                        value={postDescription}
                        placeholder="What is this post about..."
                        className=""
                        />
                    </div>
                    |<div>
                    <button 
                    type="submit"
                    className="px-3 py-2 text-white text-xl font-semibold bg-green-400 hover:bg-green-700 cursor-pointer">
                        Post
                    </button>
                </div>
                </form>
                
            </div>
        </section>
    )
}
export default Post;
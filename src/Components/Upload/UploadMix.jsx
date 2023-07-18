import React, { useState } from "react";
import NavBar from "../Home/NavBar";

const UploadMix = () => {

    const [ title, setTitle ] = useState("");
    const [ selectedImage, setSelectedImage ] = useState(null);
    const [ selectedMix, setSelectedMix ] = useState(null);
    const [ mixDescription, setMixDescription ] = useState("");

    const handleImageChange = (event) => {
        const imageFile = event.target.files[0];
        if (imageFile) {
          // Use FileReader to convert the selected image to a data URL
          const reader = new FileReader();
          reader.onloadend = () => {
            setSelectedImage(reader.result);
          };
          reader.readAsDataURL(imageFile);
        }
      };

      const handleMixChange = (event) => {
        const songFile = event.target.files[0];
        if (songFile) {
          // You can perform any additional handling here, such as uploading the song to a server or processing it.
          setSelectedMix(songFile);
        }
      };

    return (
        <section>
            <div>
                <NavBar />
            </div>
            <div className="flex flex-row items-center justify-center mx-auto max-w-4xl max-w-7xl"> 
                <form>
                <h1 className="text-2xl font-bold my-6">Upload Mix</h1>
                    <div className=" mb-6">
                    <label className="font-medium text-xl mx-4 mb-2">Enter title of the mix</label>
                    <input
                    type="text"
                    id="title"
                    name="title"
                    value={title}
                    placeholder="Enter The title of the mix..."
                    onChange={(e) => setTitle(e.target.value) }
                    className="px-6 py-2 text-lg border border-gray-300 placeholder-gray-500 text-gray-900 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500  "
                    />
                    </div>
                    <div className="flex flex-row-reverse items-center justify-center my-4">
                        <div>
                        <label className="block text-xl font-medium mb-2">Enter Mix Thumbnail</label>
                        </div>
                        <div>
                        <input 
                        type="file"
                        accept="image/"
                        className=""
                        onChange={handleImageChange}
                        />
                        <div className="flex items-center w-56 h-56 justify-center border border-red-500">
                {selectedImage ? (
                  <img
                    src={selectedImage}
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
                    <div className="flex flex-row items-center justify-center my-4">
                        <label className="font-medium text-xl mx-4 block mb-2">Enter mix Description</label>
                        <textarea
                        type="text"
                        id="description"
                        name="description"
                        placeholder="What does this mix entail..."
                        className="px-8 py-6 text-xl border border-gray-300 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                        />
                    </div>
                    <div className="my-4">
                        <label className="font-medium text-lg">Enter Mix</label>
                        <input
                        type="file"
                        accept="audio/*"
                        onChange={handleMixChange}
                        />
                        { selectedMix ? (
                            <div className="px-2 py-3 bg-gray-300">
                                <p>{selectedMix.name}</p>
                            </div>
                        ) : (
                            <div className="px-2 py-3 bg-gray-300">
                                <p>No mix has been selected</p>
                            </div>
                        )}
                    </div>
                    <div className="my-4">
                    <button
                    type="submit"
                     className="px-3 py-2 text-white text-xl font-bold bg-green-400 hover:bg-green-700 cursor-pointer">
                        Publish
                    </button>
                </div>
                </form>
            </div>
        </section>
    )
}
export default UploadMix;
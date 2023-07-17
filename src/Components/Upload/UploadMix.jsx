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
            <div>
                <h1>Upload Mix</h1>
                <form>
                    <div>
                    <label>Enter title of the mix</label>
                    <input
                    type="text"
                    id="title"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value) }
                    className=""
                    />
                    </div>
                    <div>
                        <label>Enter Image</label>
                        <input 
                        type="file"
                        accept="image/"
                        className=""
                        onChange={handleImageChange}
                        />
                        { selectedImage && (
                            <div>
                                <img
                                src={selectedImage}
                                alt="Selected"
                                style={{ maxWidth: '200px', maxHeight: '200px' }}
                                />
                            </div>
                        )}
                    </div>
                    <div>
                        <label>Enter mix Description</label>
                        <input
                        type="text"
                        id="description"
                        name="description"
                        value={mixDescription}
                        />
                    </div>
                    <div>
                        <label>Enter Mix</label>
                        <input
                        type="file"
                        accept="audio/*"
                        onChange={handleMixChange}
                        />
                        { selectedMix && (
                            <div>
                                <p>{selectedMix.name}</p>
                            </div>
                        )}
                    </div>
                    <div>
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
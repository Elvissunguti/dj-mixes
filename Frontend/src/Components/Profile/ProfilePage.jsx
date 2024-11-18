import React, { useState } from "react";
import NavBar from "../Home/NavBar";
import { BiLogoFacebookCircle, BiLogoInstagram, BiLogoTwitter } from "react-icons/bi";
import avatar from "../Assets/avatar.png";
import { IoImagesOutline } from "react-icons/io5";
import { makeAuthenticatedPOSTRequest } from "../Utils/ServerHelpers";
import { useNavigate } from "react-router-dom";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"; 
import { storage } from "../Utils/Firebase"; 

const ProfilePage = () => {
    const [biography, setBiography] = useState("");
    const [facebookUrl, setFacebookUrl] = useState("");
    const [twitterUrl, setTwitterUrl] = useState("");
    const [instagramUrl, setInstagramUrl] = useState("");
    const [coverPic, setCoverPic] = useState(null);
    const [profilePic, setProfilePic] = useState(null);
    const [uploading, setUploading] = useState(false);
    const navigate = useNavigate();

    const handleCoverChange = (event) => {
        const coverFile = event.target.files[0];
        if (coverFile) {
            setCoverPic(coverFile);
        }
    };

    const handlePictureChange = (event) => {
        const imageFile = event.target.files[0];
        if (imageFile) {
            setProfilePic(imageFile);
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

    const handleProfilePage = async (e) => {
        e.preventDefault();

        if (!biography || !facebookUrl || !twitterUrl || !instagramUrl || !coverPic || !profilePic) {
            console.log("All files are required");
            return;
        };

        setUploading(true);

        try {
            const coverPicUrl = await uploadFileToFirebase(coverPic, `profile/coverPic/${coverPic.name}`);
            const profilePicUrl = await uploadFileToFirebase(profilePic, `profile/profilePic/${profilePic.name}`);

            const formData = {
                biography,
                facebookUrl,
                twitterUrl,
                instagramUrl,
                coverPicUrl,
                profilePicUrl
            };

            const response = await makeAuthenticatedPOSTRequest("/profile/create", formData);

            if (response) {
                alert("Profile created successfully");
                navigate("/profile");
                
            }

        } catch (error) {
            console.error("Error creating profile", error);
            alert("Could not Create Profile");
        } finally {
            setUploading(false);
        }
    }

    return (
        <section>
            <NavBar />
            <div className="mx-auto py-8 w-full max-w-3xl">
                <h2 className="font-bold text-3xl text-primary mb-6 text-center">Your Profile Settings</h2>
                <form onSubmit={handleProfilePage} className="space-y-6">
                    {/* Biography Section */}
                    <div className="border rounded-lg p-4">
                        <label className="font-semibold">Biography</label>
                        <p className="text-gray-500 mb-2">Up to 1,000 characters.</p>
                        <textarea
                            id="biography"
                            placeholder="Enter some info about you..."
                            onChange={(e) => setBiography(e.target.value)}
                            className="h-36 w-full bg-gray-100 px-3 py-2 border rounded border-gray-300 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                        />
                    </div>

                    {/* Social Links Section */}
                    <div className="border rounded-lg p-4">
                        <h3 className="text-lg font-semibold">Social Links</h3>
                        {[
                            { icon: <BiLogoFacebookCircle className="text-3xl" />, placeholder: "https://www.facebook.com/yourusername/", setter: setFacebookUrl },
                            { icon: <BiLogoTwitter className="text-3xl" />, placeholder: "https://www.twitter.com/@yournamehere", setter: setTwitterUrl },
                            { icon: <BiLogoInstagram className="text-3xl" />, placeholder: "https://www.instagram.com/yourusername", setter: setInstagramUrl },
                        ].map((link, index) => (
                            <div key={index} className="flex items-center space-x-4 my-4">
                                <label>{link.icon}</label>
                                <input
                                    type="text"
                                    placeholder={link.placeholder}
                                    onChange={(e) => link.setter(e.target.value)}
                                    className="px-4 py-2 w-full border rounded border-gray-300 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                                />
                            </div>
                        ))}
                    </div>

                    {/* Profile Picture Section */}
                    <div className="border rounded-lg p-4 flex items-center">
                        <div className="w-2/5">
                            <label className="font-semibold">Profile Picture</label>
                            <p className="text-gray-500">JPEG, GIF, or PNG</p>
                        </div>
                        <input
                            id="profilePic"
                            type="file"
                            accept="image/*"
                            onChange={handlePictureChange}
                            className="hidden"
                        />
                        <label htmlFor="profilePic" className="bg-blue-700 h-10 px-3 py-2 text-white font-semibold rounded cursor-pointer">
                            CHOOSE FILE
                        </label>
                        <div className="w-16 h-16 ml-4">
                            {profilePic ? (
                                <img src={URL.createObjectURL(profilePic)} alt="profile" className="w-full h-full rounded" />
                            ) : (
                                <img src={avatar} alt="avatar" className="w-full h-full rounded" />
                            )}
                        </div>
                    </div>

                    {/* Cover Picture Section */}
                    <div className="border rounded-lg p-4 flex items-center">
                        <div className="w-2/5">
                            <label className="font-semibold">Cover Picture</label>
                            <p className="text-left text-gray-500">We recommend 1600px wide and 350px tall. Avoid using text within your cover image, as it could be cropped on smaller screens.</p>
                        </div>
                        <input
                            id="coverPic"
                            type="file"
                            accept="image/*"
                            onChange={handleCoverChange}
                            className="hidden"
                        />
                        <label htmlFor="coverPic" className="bg-blue-700 h-10 px-3 py-2 text-white font-semibold rounded cursor-pointer">
                            CHOOSE FILE
                        </label>
                        <div className="w-64 h-16 ml-4">
                            {coverPic ? (
                                <img src={URL.createObjectURL(coverPic)} alt="cover" className="w-full h-full rounded" />
                            ) : (
                                <div className="flex items-center justify-center text-3xl px-8 py-3 bg-gray-300 rounded">
                                    <IoImagesOutline />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="px-4 py-2 w-full text-white text-lg font-bold bg-green-500 rounded hover:bg-green-700 transition-all duration-300"
                            disabled={uploading} // Disable button while uploading
                        >
                            {uploading ? "Saving..." : "Save Profile Settings"}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default ProfilePage;

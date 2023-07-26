import React, { useState } from "react";
import NavBar from "../Home/NavBar";
import {BiLogoFacebookCircle, BiLogoInstagram, BiLogoTwitter} from "react-icons/bi";

const ProfilePage = () => {

    const [ displayName, setDisplayName ] = useState("");
    const [ biography, setBiography ] = useState("");
    const [ facebookUrl, setFacebookUrl ] = useState("");
    const [ twitterUrl, setTwitterUrl ] = useState("");
    const [ instagramUrl, setInstagramUrl ]= useState("");

    return(
        <section>
            <NavBar />
            <div>
                <p>Your profile settings</p>
                <div>
                    <form>
                        <div>
                        <label>Display name</label>
                        <input
                        type="text"
                        id="name"
                        placeholder="Display name"
                        onChange={(e) =>setDisplayName(e.target.value) } 
                        className=""
                        />
                        </div>
                        <div>
                            <label>Biography</label>
                            <textarea
                            type="text"
                            id="biography"
                            placeholder="Biography"
                            onChange={(e) => setBiography(e.target.value)}
                            className=""
                            />
                        </div>

                        <p>Social Links</p>
                        <div>
                            <label><BiLogoFacebookCircle /></label>
                            <input
                            type="text"
                            id="facebook"
                            placeholder="https://www.facebook.com/yourusername/"
                            onChange={(e) => setFacebookUrl(e.target.value)}
                            className=""
                            /> 
                        </div>
                        <div>
                            <label><BiLogoTwitter /></label>
                            <input
                            type="text"
                            id="twitter"
                            placeholder="https://www.twitter.com/@yournamehere"
                            onChange={(e) => setTwitterUrl(e.target.value)}
                            className=""
                            />
                        </div>
                        <div>
                            <label><BiLogoInstagram /></label>
                            <input
                            type="text"
                            id="instagram"
                            placeholder="https://www.instagram.com/yourusername"
                            onChange={(e) => setInstagramUrl(e.target.value)}
                            className=""
                            />
                        </div>
                        <div>
                            <label>Profile Picture</label>
                            <p>JPEG, GIF or PNG</p>
                            <input
                            type="file"
                            accept=".jpg,.jpeg,.gif,.png"
                            className=""
                            />
                        </div>
                        <div>
                            <label>Cover Picture</label>
                            <p>We recommend 1600px wide and 350px tall. Avoid using text within your cover image, as it could be cropped on smaller screens.</p>
                            <input
                            type="file"
                            accept=".jpg,.jpeg,.gif,.png"
                            className=""
                            />
                        </div>
                        <div>
                            <button type="submit"
                             className="px-3 py-2 text-lg text-white text-bold bg-blue-500 hover:bg-blue-700 ">
                                SAVE PROFILE SETTINGS
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
};
export default ProfilePage;
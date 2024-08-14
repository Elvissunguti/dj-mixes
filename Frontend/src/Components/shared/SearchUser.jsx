import React from "react";
import { useNavigate } from "react-router-dom";

const SearchUser = ({ profilePic, userName, userId }) => {

    const navigate = useNavigate();

    const profilePicFilename = profilePic ? profilePic.split("\\").pop() : null;
    const profilePicUrl = profilePic ? `/Profile/ProfilePic/${profilePicFilename}` : null;

         // To fetch the profile of an artist in a mix
  const handleArtistClick = () => {
    navigate(`/public profile?userId=${userId}`);
  };

    return (
        <section>
            <div>
                <div className="flex">
                    <img
                      src={profilePicUrl}
                      alt="ProfilePic"
                      className="w-24 h-24 rounded-full cursor-pointer"
                      onClick={handleArtistClick}
                    />
                    <p className="text-xl hover:text-green-200 cursor-pointer" onClick={handleArtistClick}>{userName}</p>
                </div>

            </div>
        </section>
    )
}
export default SearchUser;
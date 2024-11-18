import React from "react";
import { useNavigate } from "react-router-dom";

const SearchUser = ({ profilePic, userName, userId }) => {
    const navigate = useNavigate();


    const handleArtistClick = () => {
        navigate(`/public-profile?userId=${userId}`);
    };

    return (
        <section className="p-4 ">
            <div className="card card-side bg-base-100 shadow-xl rounded-lg flex items-center space-x-4 p-4 hover:bg-base-200">
                <img
                    src={profilePic || "/default-avatar.png"}
                    alt="ProfilePic"
                    className="w-16 h-16 rounded-full object-cover cursor-pointer hover:opacity-90"
                    onClick={handleArtistClick}
                />
                <div>
                    <p
                        className="text-lg font-semibold text-primary cursor-pointer hover:underline"
                        onClick={handleArtistClick}
                    >
                        {userName}
                    </p>
                </div>
            </div>
        </section>
    );
};

export default SearchUser;

import React from "react";

const SearchUser = ({ profilePic, userName }) => {

    const profilePicFilename = profilePic ? profilePic.split("\\").pop() : null;
    const profilePicUrl = profilePic ? `/Profile/ProfilePic/${profilePicFilename}` : null;

    return (
        <section>
            <div>
                <div className="flex">
                    <img
                      src={profilePicUrl}
                      alt="ProfilePic"
                      className="w-24 h-24 rounded-full cursor-pointer"
                    />
                    <p>{userName}</p>
                </div>

            </div>
        </section>
    )
}
export default SearchUser;
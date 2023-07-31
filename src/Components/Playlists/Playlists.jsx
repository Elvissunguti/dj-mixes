import React from "react";
import LoggedInContainer from "../Containers/LoggedInContainer";

const Playlists = () => {
    return (
        <LoggedInContainer curActiveScreen="playlists" >
            <div>
                <h1>Playlists</h1>
            </div>
        </LoggedInContainer>
    )
}
export default Playlists;
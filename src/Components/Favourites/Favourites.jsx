import React from "react";
import LoggedInContainer from "../Containers/LoggedInContainer";

const Favourites = () => {
    return(
        <LoggedInContainer curActiveScreen="favourites">
            <div>
                <h1>Favouriotes</h1>
            </div>
        </LoggedInContainer>
    )
}
export default Favourites;
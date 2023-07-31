import React from "react";
import LoggedInContainer from "../Containers/LoggedInContainer";

const MyMix = () => {
    return(
       <LoggedInContainer curActiveScreen="my mixes">
        <div>
            <h1>MY MIXES</h1>
        </div>
       </LoggedInContainer>
    )
}
export default MyMix;
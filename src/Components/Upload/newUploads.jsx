import React from "react";
import LoggedInContainer from "../Containers/LoggedInContainer";

const NewUpload = () => {
    return(
        <LoggedInContainer curActiveScreen="new uploads">
            <div>
                <h1>NEW UPLOADS</h1>
            </div>

        </LoggedInContainer>
    )
}
export default NewUpload;
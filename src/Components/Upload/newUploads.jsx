import React from "react";
import LoggedInContainer from "../Containers/LoggedInContainer";
import { useState } from "react";
import { useEffect } from "react";
import { makeAuthenticatedGETRequest } from "../Utils/ServerHelpers";
import MixCard from "../shared/MixCard";

const NewUpload = () => {

    const [ newUploads, setNewUploads ] = useState([]);

    useEffect(() => {
        const uploads = async () => {
            const response = await makeAuthenticatedGETRequest(
                "/user/get/newUploads"
            )
            setNewUploads(response.data);
        }
        uploads();
    }, []);


    return(
        <LoggedInContainer curActiveScreen="new uploads">
            <div>
                <h1>NEW UPLOADS</h1>
            </div>
            <div>
            {newUploads.length > 0 ? (
              newUploads.map((item, index) => (
                <MixCard key={index} thumbnail={item.thumbnail} title={item.title} artist={item.artist} />
                ))
             ) : (
             <p>Loading...</p>
            )}

            </div>

        </LoggedInContainer>
    )
}
export default NewUpload;
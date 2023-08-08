import React, { useEffect, useState } from "react";
import LoggedInContainer from "../Containers/LoggedInContainer";
import { makeAuthenticatedGETRequest } from "../Utils/ServerHelpers";

const MyMix = () => {

    const [mixData, setMixData ] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const response = await makeAuthenticatedGETRequest(
                "/mix/get/myMix"
            );
            setMixData(response.data);
        };
        getData();
    }, []);


    return(
       <LoggedInContainer curActiveScreen="my mixes">
        <div>
            <h1>MY MIXES</h1>
        </div>
       </LoggedInContainer>
    )
}
export default MyMix;
import React, { useEffect, useState } from "react";
import LoggedInContainer from "../Containers/LoggedInContainer";
import { makeAuthenticatedGETRequest } from "../Utils/ServerHelpers";
import MixCard from "../shared/MixCard";

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
        <div className="space-y-4 overflow-auto  ">
            { mixData.map((item, index) => {
                return <MixCard key={index} thumbnail={item.thumbnail} title={item.title} artist={item.artist} />
            })}
        </div>
       </LoggedInContainer>
    )
}
export default MyMix;
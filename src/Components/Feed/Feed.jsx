import React from "react";
import MixCard from "../shared/MixCard";
import LoggedInContainer from "../Containers/LoggedInContainer";
import { useState } from "react";
import { makeAuthenticatedGETRequest } from "../Utils/ServerHelpers";
import { useEffect } from "react";


const Feed = () => {

  const [ feedData, SetFeedData ] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        const response = await makeAuthenticatedGETRequest(
          "/user/followed-mixes"
        );
        console.log("response:", response)
        SetFeedData(response.data)
    };
    fetchData();
  }, []);


    return(
      <LoggedInContainer curActiveScreen="feed">
        <div className="flex items-start mb-6">
            <h1 className="font-bold text-xl">Feed</h1>
        </div>
        <div className="space-y-4 overflow-auto ">
        {feedData.length > 0 ? (
          feedData.map((item, index) => (
            <MixCard key={index} thumbnail={item.thumbnail} title={item.title} artist={item.artist} />
              ))
            ) : (
             <p>Loading...</p>
              )}
        </div>
      </LoggedInContainer>
    )
}
export default Feed;
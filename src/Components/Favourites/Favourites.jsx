import React, { useState } from "react";
import LoggedInContainer from "../Containers/LoggedInContainer";
import MixCard from "../shared/MixCard";
import {  makeAuthenticatedGETRequest, makeAuthenticatedPOSTRequest } from "../Utils/ServerHelpers";
import { useEffect } from "react";

const Favourites = () => {

    const [ favouriteData, setFavouriteData ] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await makeAuthenticatedGETRequest(
                    "/mix/favourited"
                );
                console.log(response)
                setFavouriteData(response.data)
                

            } catch (error){
                console.error("Error fetching favouritedData :", error);
            }
        }
        fetchData();
    }, []);




    const handleToggleFavourite = async (_id, isFavourite) => {
        try {
          console.log("Toggling favorite for mix:", _id);
          if (isFavourite) {
            await deleteFavourite(_id);
          } else {
            await addFavourite(_id);
          }
          // No need to fetch data again, just update the state with the changed data
          setFavouriteData((prevFavouriteData) =>
            prevFavouriteData.map((item) =>
              item._id === _id ? { ...item, isFavourite: !isFavourite } : item
            )
          );
        } catch (error) {
          console.error("Error toggling favourite:", error);
        }
      };
    
      const addFavourite = async (_id) => {
        try {
          const response = await makeAuthenticatedPOSTRequest(
            "/mix/addFavourite",
            { mixId: _id }
          );
    
          if (response.error) {
            console.error("Error adding to favourites:", response.error);
          }
        } catch (error) {
          console.error("Error adding to favourites:", error);
        }
      };
    
      const deleteFavourite = async (_id) => {
        try {
          const response = await makeAuthenticatedPOSTRequest(
            "/mix/deleteFavourite",
            { mixId: _id }
          );
    
          if (response.error) {
            console.error("Error deleting from favourites:", response.error);
          }
        } catch (error) {
          console.error("Error deleting from favourites:", error);
        }
      };

    return(
        <LoggedInContainer curActiveScreen="favourites">
            <div className="flex items-start mb-6">
                <h1 className="font-bold text-xl">Favourites</h1>
            </div>
            <div className="space-y-4 overflow-auto">
            {favouriteData.length > 0 ? (
              favouriteData.map((item, index) => (
               <MixCard
                 key={index}
                 mixId={item._id}
                 thumbnail={item.thumbnail}
                 title={item.title}
                 artist={item.artist}
                 userId={item.userId}
                 audioSrc={item.track}
                 toggleFavourite={() =>
                 handleToggleFavourite(item._id, item.isFavourite)
                  }
                favouriteCount={item.favouriteCount}
            />
          ))
        ) : (
          <p>Loading...</p>
        )}
           </div>
        </LoggedInContainer>
    )
}
export default Favourites;
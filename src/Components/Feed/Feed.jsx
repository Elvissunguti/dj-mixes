import React, { useState, useEffect } from "react";
import MixCard from "../shared/MixCard";
import LoggedInContainer from "../Containers/LoggedInContainer";
import {
  makeAuthenticatedGETRequest,
  makeAuthenticatedPOSTRequest,
} from "../Utils/ServerHelpers";
import CurrentMix from "../shared/CurrentMix";

const Feed = () => {
  const [feedData, setFeedData] = useState([]);
  const [currentMix, setCurrentMix] = useState(null);
  const [currentlyPlayingMixId, setCurrentlyPlayingMixId] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await makeAuthenticatedGETRequest(
          "/user/followed-mixes"
        );
        console.log(response)
        setFeedData(response.data);
      } catch (error) {
        console.error("Error fetching feed data:", error);
      }
    };
    fetchData();
  }, []);



  

  const handleToggleFavourite = async (_id, isFavourite) => {
    try {
      if (isFavourite) {
        await deleteFavourite(_id);
      } else {
        await addFavourite(_id);
      }
      // No need to fetch data again, just update the state with the changed data
      setFeedData((prevFeedData) =>
        prevFeedData.map((item) =>
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

  const handlePlayPause = (mixId) => {
    if (currentlyPlayingMixId === mixId) {
      // Pause the currently playing mix
      setIsPlaying(false);
      setCurrentlyPlayingMixId(null);
    } else {
      // Play the selected mix
      setIsPlaying(true);
      setCurrentlyPlayingMixId(mixId);
      // Find the playing mix data from feedData and set it as the currentMix
      const playingMix = feedData.find((item) => item._id === mixId);
      setCurrentMix({
        ...playingMix,
        currentSong: "play",
        currentTime: 0,
      });
    }
  };

  const playNextMix = () => {
    // Pause the currently playing mix if it's playing
    if (isPlaying && currentlyPlayingMixId) {
      handlePlayPause(currentlyPlayingMixId);
    }

    // Find the index of the currently playing mix in the feedData array
    const currentIndex = feedData.findIndex((item) => item._id === currentlyPlayingMixId);

    if (currentIndex !== -1 && currentIndex < feedData.length - 1) {
      const nextIndex = currentIndex + 1;
      const nextMix = feedData[nextIndex];

      if (nextMix) {
        // Set the next mix as the current mix and play it 
        setCurrentMix(nextMix);
        setIsPlaying(true);
        setCurrentlyPlayingMixId(nextMix._id);
      }
    }
  };
  
  // New callback function to play the previous mix
  const playPrevMix = () => {
    // Pause the currently playing mix if it's playing
    if (isPlaying && currentlyPlayingMixId) {
      handlePlayPause(currentlyPlayingMixId);
    }

    // Find the index of the currently playing mix in the feedData array
    const currentIndex = feedData.findIndex((item) => item._id === currentlyPlayingMixId);

    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      const prevMix = feedData[prevIndex];

      if (prevMix) {
        // Set the previous mix as the current mix and play it
        setCurrentMix(prevMix);
        setIsPlaying(true);
        setCurrentlyPlayingMixId(prevMix._id);
      }
    }
  };


  console.log("CurrentMix data:", currentMix);


  return (
    <LoggedInContainer curActiveScreen="feed">
      <div className="flex items-start mb-6">
        <h1 className="font-bold text-xl">Feed</h1>
      </div>
      <div className="space-y-4 overflow-auto">
        {feedData.length > 0 ? (
          feedData.map((item, index) => (
            <MixCard
              key={index}
              mixId={item._id}
              thumbnail={item.thumbnail}
              title={item.title}
              artist={item.artist}
              audioSrc={item.track}
              userId={item.userId}
              toggleFavourite={() =>
                handleToggleFavourite(item._id, item.isFavourite)
              }
              favouriteCount={item.favouriteCount}
              onMixPlay={handlePlayPause}
              currentlyPlayingMixId={currentlyPlayingMixId}
              isPlaying={isPlaying}
              
            />
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
      {currentMix && (
        <CurrentMix
          mixId={currentMix._id}
          thumbnail={currentMix.thumbnail}
          title={currentMix.title}
          artist={currentMix.artist}
          audioSrc={currentMix.track}
          currentSong={currentMix.currentSong}
          setCurrentSong={(songState) =>
            setCurrentMix({ ...currentMix, currentSong: songState })
          }
          currentTime={currentMix.currentTime}
          isPlaying={isPlaying}
          onMixPlay={handlePlayPause}
          onPlayNext={playNextMix} 
          onPlayPrev={playPrevMix}

        />
      )}
    </LoggedInContainer>
  );
};

export default Feed;


import React, { useEffect, useState } from "react";
import { makeAuthenticatedGETRequest, makeAuthenticatedPOSTRequest } from "../Utils/ServerHelpers";
import MixCard from "../shared/MixCard";
import CurrentMix from "../shared/CurrentMix";
import { Link } from "react-router-dom";
import { IoCreateOutline } from "react-icons/io5";

const Uploads = () => {
    const [mixData, setMixData] = useState([]);
    const [currentMix, setCurrentMix] = useState(null);
    const [currentlyPlayingMixId, setCurrentlyPlayingMixId] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [existingPlaylists, setExistingPlaylists] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await makeAuthenticatedGETRequest("/mix/get/myMix");
                setMixData(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching my mixes:", error);
                setIsLoading(false);
            }
        };
        getData();
    }, []);

    const handlePlayPause = (mixId) => {
        if (currentlyPlayingMixId === mixId) {
            setIsPlaying(false);
            setCurrentlyPlayingMixId(null);
        } else {
            setIsPlaying(true);
            setCurrentlyPlayingMixId(mixId);
            const playingMix = mixData.find((item) => item._id === mixId);
            setCurrentMix({ ...playingMix, currentSong: "play", currentTime: 0 });
        }
    };

    const playPrevMix = () => {
        if (!currentMix) return;
        const currentIndex = mixData.findIndex((item) => item._id === currentMix._id);
        if (currentIndex > 0) {
            const prevMix = mixData[currentIndex - 1];
            if (isPlaying) pauseAudio(currentMix._id);
            setCurrentMix({ ...prevMix, currentSong: "play", currentTime: 0 });
            setCurrentlyPlayingMixId(prevMix._id);
            playAudio(prevMix._id);
        }
    };

    const playNextMix = () => {
        if (!currentMix) return;
        const currentIndex = mixData.findIndex((item) => item._id === currentMix._id);
        if (currentIndex < mixData.length - 1) {
            const nextMix = mixData[currentIndex + 1];
            if (isPlaying) pauseAudio(currentMix._id);
            setCurrentMix({ ...nextMix, currentSong: "play", currentTime: 0 });
            setCurrentlyPlayingMixId(nextMix._id);
            playAudio(nextMix._id);
        }
    };

    const pauseAudio = (mixId) => {
        const audioElement = document.getElementById(`audio-${mixId}`);
        if (audioElement) audioElement.pause();
    };

    const playAudio = (mixId) => {
        const audioElement = document.getElementById(`audio-${mixId}`);
        if (audioElement) audioElement.play();
        setIsPlaying(true);
    };

    const createPlaylistAndAddMix = async ({ mixId, name }) => {
        try {
            const response = await makeAuthenticatedPOSTRequest("/playlist/createPlaylist", { mixId, name });
            return response;
        } catch (error) {
            console.error("Error creating playlist and adding mix:", error);
        }
    };

    const fetchPlaylists = async () => {
        try {
            const response = await makeAuthenticatedGETRequest("/playlist/get/playlist");
            setExistingPlaylists(response.data);
        } catch (error) {
            console.error("Error fetching Playlist", error);
        }
    };

    return (
        <section className="px-8 py-10">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">My Mixes</h1>
                <Link to="/upload-edit" className="btn btn-outline btn-primary gap-2">
                    <IoCreateOutline className="text-2xl" /> Edit
                </Link>
            </div>
            <div className="space-y-4">
                {isLoading ? (
                    <div className="flex justify-center items-center h-96">
                        <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-primary"></div>
                    </div>
                ) : mixData.length > 0 ? (
                    mixData.map((item, index) => (
                        <MixCard
                            key={index}
                            mixId={item._id}
                            thumbnail={item.thumbnail}
                            title={item.title}
                            artist={item.artist}
                            audioSrc={item.track}
                            userId={item.userId}
                            favouriteCount={item.favouriteCount}
                            onMixPlay={handlePlayPause}
                            currentlyPlayingMixId={currentlyPlayingMixId}
                            isPlaying={isPlaying}
                            createPlaylistAndAddMix={createPlaylistAndAddMix}
                            fetchPlaylists={fetchPlaylists}
                            existingPlaylists={existingPlaylists}
                        />
                    ))
                ) : (
                    <p className="text-center text-lg">You haven’t uploaded a mix yet...</p>
                )}
            </div>
            {currentMix && (
                <CurrentMix
                    mixId={currentMix._id}
                    userId={currentMix.userId}
                    thumbnail={currentMix.thumbnail}
                    title={currentMix.title}
                    artist={currentMix.artist}
                    audioSrc={currentMix.track}
                    currentSong={currentMix.currentSong}
                    setCurrentSong={(songState) => setCurrentMix({ ...currentMix, currentSong: songState })}
                    currentTime={currentMix.currentTime}
                    duration={currentMix.duration}
                    isPlaying={isPlaying}
                    onMixPlay={handlePlayPause}
                    onPlayNext={playNextMix}
                    onPlayPrev={playPrevMix}
                />
            )}
        </section>
    );
};

export default Uploads;

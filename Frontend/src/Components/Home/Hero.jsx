import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import  aboutBgImage  from '../Assets/AboutBg.png'; 
import heroImage from '../Assets/heroMixerBg.jpg'; 
import { makeUnAuthenticatedGETRequest } from '../Utils/ServerHelpers';
import PreviewMixCard from '../shared/PreviewMixCard';
import CurrentMix from '../shared/CurrentMix';

const Hero = () => {
  const [mix, setMix] = useState([]);
  const [currentMix, setCurrentMix] = useState(null);
  const [currentlyPlayingMixId, setCurrentlyPlayingMixId] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await makeUnAuthenticatedGETRequest("/mix/fetchMix");
        setMix(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch mix from server', error);
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
      const playingMix = mix.find((item) => item._id === mixId);
      setCurrentMix({ ...playingMix, currentSong: "play", currentTime: 0 });
    }
  };



  const navigate = useNavigate();

  const handleExploreMixes = () => {
    navigate('/login'); 
  };

  return (
    <div className="landing-page-container">
      {/* Hero Section */}
      <section
  className="hero-section relative bg-cover bg-center flex items-center justify-center text-center text-white h-screen"

>
  {/* Background Image with brightness */}
  <div
    className="absolute inset-0"
    style={{
      backgroundImage: `url(${heroImage})`,
      filter: "brightness(0.7)",
      backgroundSize: "cover",
      backgroundPosition: "center",
      zIndex: -1, // ensures the background stays behind the content
    }}
  ></div>

  <div className="bg-opacity-50 p-10 rounded-lg relative" style={{ background: "rgba(0, 0, 0, 0)" }}>
    <h1 className="text-5xl font-bold mb-4 drop-shadow-lg">Welcome to MixHub</h1>
    <p className="text-lg mb-8 drop-shadow-md">
      Discover and enjoy the best DJ mixes from around the world.
    </p>
    <button
      className="btn btn-success hover:bg-green-600 text-lg px-6 py-3 transition-colors duration-300"
      onClick={handleExploreMixes}
    >
      Explore Mixes
    </button>
  </div>
</section>


      {/* About Section */}
      <section
  className="about-section relative bg-cover bg-center py-20 px-8 text-white text-center"
>
  {/* Background Image with brightness */}
  <div
    className="absolute inset-0"
    style={{
      backgroundImage: `url(${aboutBgImage})`,
      filter: "brightness(0.7)",
      backgroundSize: "cover",
      backgroundPosition: "center",
      zIndex: -1, // ensures the background is behind the text
    }}
  ></div>

  <div className="bg-opacity-50 p-10 rounded-lg max-w-4xl mx-auto relative" style={{ background: "rgba(0, 0, 0, 0)" }}>
    <h2 className="text-4xl font-bold mb-8 drop-shadow-lg ">Why MixHub?</h2>
    <p className="text-lg mb-8 drop-shadow-md">
      MixHub is your ultimate destination for discovering new and exciting DJ mixes. Whether you're a fan of electronic music, hip-hop, or any other genre, our platform offers a vast collection of high-quality mixes curated by top DJs. Dive in and start your musical journey with MixHub today.
    </p>
  </div>
</section>


      {/* Featured Mixes Section */}
      <section className="featured-mixes-section py-20 px-8 bg-white text-center">
        <h2 className="text-4xl font-bold mb-12">Featured Mixes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {isLoading ? (
            <div className="min-h-screen flex justify-center">
              <div className="animate-spin w-20 h-20 border-t-4 border-green-500 border-solid rounded-full"></div>
            </div>
          ) : (
            mix.map((item, index) => (
              <PreviewMixCard
                key={index}
                mixId={item._id}
                thumbnail={item.thumbnail}
                title={item.title}
                artist={item.artist}
                audioSrc={item.track}
                userId={item.userId}
                onMixPlay={handlePlayPause}
                currentlyPlayingMixId={currentlyPlayingMixId}
                isPlaying={isPlaying}
              />
            ))
          )}
         
        </div>
        <button
          className="btn btn-outline btn-success text-lg px-6 py-3 mt-8 transition-colors duration-300 hover:bg-green-600 hover:text-white"
          onClick={handleExploreMixes}
        >
          See All Mixes
        </button>
      </section>

      {/* Footer */}
      <footer className="py-10 bg-gray-800 text-white text-center">
        <p>&copy; 2024 MixHub. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Hero;

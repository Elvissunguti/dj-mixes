import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Redirect } from 'react-router-dom';
import './App.css';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Profile from './Components/Profile/Profile';
import Settings from './Components/Settings/Settings';
import Feed from './Components/Feed/Feed';
import UploadMix from './Components/Upload/UploadMix';
import Post from './Components/Post/Post';
import ProfilePage from './Components/Profile/ProfilePage';
import LoggedInContainer from './Components/Containers/LoggedInContainer';
import NewUpload from './Components/Upload/newUploads';
import MyMix from './Components/My Mix/MyMix';
import PostCard from './Components/Post/PostCard';
import PostPage from './Components/Post/PostPage';
import Favourites from './Components/Favourites/Favourites';
import Historys from './Components/Historys/Historys';
import Playlists from './Components/Playlists/Playlists';
import PublicProfile from './Components/Profile/PublicProfile';
import { useCookies } from 'react-cookie';
import MixContext from './Components/Contexts/MixContext';

function App() {
  const [currentMix, setCurrentMix] = useState(null);
  const [soundPlayed, setSoundPlayed] = useState(null);
  const [isPaused, setIsPaused] = useState(true);
  const [cookie, setCookie] = useCookies(['token']);
  const [loggedIn, setLoggedIn] = useState(false); // New state to check if the user is logged in

  useEffect(() => {
    // Check if the token exists in cookies to determine if the user is logged in
    const token = localStorage.getItem('token'); // You can also use cookies here if needed
    setLoggedIn(!!token);
  }, []);

  return (
    <div className="App">
      <Router>
        <MixContext.Provider
          value={{
            currentMix,
            setCurrentMix,
            soundPlayed,
            setSoundPlayed,
            isPaused,
            setIsPaused,
          }}
        >
          <Routes>
            {/* Public routes */}
            {loggedIn ? (
              <>
              <Route path="/my mixes" element={<MyMix />} />
              <Route path="/posts" element={<Post />} />
              <Route path="/*" element={<NotFound />} />
              
              
            </>
            ) : (
              // Logged-in routes
              
              <>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/public profile" element={<PublicProfile /> } />
              <Route path="/*" element={<NotFound />} />
            </>
            )}
          </Routes>
        </MixContext.Provider>
      </Router>
    </div>
  );
}

function NotFound() {
  return <h1>Page not found.</h1>;
}

export default App;


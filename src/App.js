import React from 'react';
import { Route, Router, Routes } from 'react-router-dom';
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
import { useState } from 'react';
import { useCookies } from "react-cookie";
import MixContext from './Components/Contexts/MixContext';

function App() {

  const [ currentMix, setCurrentMix ] = useState(null);
  const [ soundPlayed, setSoundPlayed ] = useState(null);
  const [ isPaused, setIsPaused ] = useState(true);
  const [ cookie, setCookie ] = useCookies(["token"]);


  return (
    <div className="App">
      
        { cookie.token ? (
          <MixContext.Provider
          value= {{
            currentMix,
            setCurrentMix,
            soundPlayed,
            setSoundPlayed,
            isPaused,
            setIsPaused,
          }}
          >
            <Routes>
            <Route path='/Profile' element={<Profile />} />
        <Route path='/settings' element={<Settings />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/uploadMix' element={<UploadMix />} />
        <Route path='/post' element={<Post />} />
        <Route path='/profilepage' element={<ProfilePage />}  />
        <Route path="/loggedincontainer" element={<LoggedInContainer />} />
        <Route path="/new uploads" element={<NewUpload />} />
        <Route path="/my mixes" element={<MyMix />} />
        <Route path="/post page" element={<PostPage />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/historys" element={<Historys />} />
        <Route path="/playlists" element={<Playlists />} />
        <Route path='/post card' element={<PostCard />} />
        <Route path='/public profile' element={<PublicProfile />} />

            </Routes>

            </MixContext.Provider>
        ) : (
          <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register'  element={<Register />} />
          </Routes>

        )}
        

        
      
      
    </div>
  );
}

export default App;

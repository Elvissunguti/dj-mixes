import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Profile from './Components/Profile/Profile';
import Feed from './Components/Feed/Feed';
import UploadMix from './Components/Upload/UploadMix';
import Post from './Components/Post/Post';
import ProfilePage from './Components/Profile/ProfilePage';
import NewUpload from './Components/Upload/newUploads';
import MyMix from './Components/My Mix/MyMix';
import PostPage from './Components/Post/PostPage';
import Favourites from './Components/Favourites/Favourites';
import Playlists from './Components/Playlists/Playlists';
import PublicProfile from './Components/Profile/PublicProfile';
import Edit from './Components/Edit/Edit';
import UploadEdit from './Components/Upload/UploadEdit';
import EditPost from './Components/Post/EditPost';
import { useAuth } from './Components/Context/AuthContext';
import PlaylistDetails from './Components/Playlists/PlaylistDetails'; 


function App() {
  
  const { loggedIn } = useAuth();

  return (
    <div className="App">
      <Router>
          <Routes>
            {/* Public routes */}
            {!loggedIn ? (
              <>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </>
            ) : (
              <>
                <Route path="/" element={<Feed />} />
                <Route path='/feed' element={<Feed />} />
                <Route path="/my-mixes" element={<MyMix />} />
                <Route path="/new-uploads" element={<NewUpload />} />
                <Route path="/post-page" element={<PostPage />} />
                <Route path="/posts" element={<Post />} />
                <Route path="/favourites" element={<Favourites />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/upload-mix" element={<UploadMix />} />
                <Route path='/profile-page' element={<ProfilePage />} />
                <Route path="/public_profile" element={<PublicProfile /> } />
                <Route path="/playlists" element={<Playlists />} />
                <Route path="/edit/:playlistID" element={<Edit />} />
                <Route path="/upload-edit" element={<UploadEdit />} />
                <Route path="/post-edit" element={<EditPost />} />
                <Route path="/playlist/:playlistId" element={<PlaylistDetails />} />

              </>
            )}
            {/* Catch-all for 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
      </Router>
    </div>
  );
}

function NotFound() {
  return <h1 className='text-2xl'>Page not found. <Link to="/" className="text-red-600">Go to Homepage</Link></h1>;
}

export default App;

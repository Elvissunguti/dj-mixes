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

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register'  element={<Register />} />
        <Route path='/Profile' element={<Profile />} />
        <Route path='/settings' element={<Settings />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/uploadMix' element={<UploadMix />} />
      </Routes>
      
    </div>
  );
}

export default App;

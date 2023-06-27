import React from 'react';
import { Route, Router } from 'react-router-dom';
import './App.css';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';

function App() {
  return (
    <div className="App">
      <Home />
      <Login />
      <Register />

      
   
    
      
    </div>
  );
}

export default App;

import React from "react";
import { Link } from "react-router-dom";
import logo from "../Assets/logo.png";

const PreviewNavBar = () => {
  return (
    <nav className="bg-base-300 shadow-lg h-16 flex">
      <div className="container mx-auto flex justify-between items-center p-4">
        
        {/* Logo Section with Hover Effect */}
        <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-300">
          <img src={logo} alt="Logo" className="h-12" />
          <span className="text-xl font-bold text-primary">MIXHUB</span>
        </Link>

        {/* Action Buttons with Different Colors and Hover Effects */}
        <div className="flex items-center space-x-4">
          <Link to="/login">
            <button className="btn btn-outline btn-accent hover:bg-accent hover:text-white transition-colors duration-300">
              Log In
            </button>
          </Link>
          <Link to="/register">
            <button className="btn btn-primary hover:bg-primary-focus transition-colors duration-300">
              Register
            </button>
          </Link>
        </div>
        
      </div>
    </nav>
  );
};

export default PreviewNavBar;

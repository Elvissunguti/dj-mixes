import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


// Define a function to remove cookies
function removeCookies(name, options) {
  document.cookie = `${encodeURIComponent(name)}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${options.path || "/"}`;
}


const Logout = () => {
  const [showAlert, setShowAlert] = useState(false);

  const navigate = useNavigate();

  const handleLogout = async () => {
    const confirmLogout = window.confirm("Do you want to logout?");
    if (confirmLogout) {
      try {
        const token = localStorage.getItem("token"); // Get the token from localStorage
  
        const response = await fetch("http://localhost:3000/auth/logout", {
          method: 'POST',
          headers: {
            'Authorization': token, // Include the token in the Authorization header
            'Content-Type': 'application/json',
          },
        });
  
        if (response.ok) {
          // Clear token from localStorage and cookies
          localStorage.removeItem("token");
          removeCookies("token", { path: "/" });
  
          // Logout successful
          setShowAlert(true);
          navigate("/login");
          console.log("Logout successful");
        } else {
          console.error("Logout failed");
          
        }
      } catch (error) {
        console.error("Error during logout:", error);
      }
    }
  };
  

  return (
    <div>
      {showAlert && (
        <div className="logout-alert">
          Logout successful! You have been logged out.
        </div>
      )}

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Logout;
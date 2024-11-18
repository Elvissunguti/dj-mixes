import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../Assets/logo.png";
import { makeUnauthenticatedPOSTRequest } from "../Utils/ServerHelpers";
import { useAuth } from "../Context/AuthContext";
import Cookies from "js-cookie";


const Register = () => {

    const [formData, setFormData] = useState({
        userName: "",
        email: "",
        password: "",
        confirmPassword: ""
      });
    
      const [passwordError, setPasswordError] = useState("");
      const [emailError, setEmailError] = useState("");
    
      const { handleLogin } = useAuth();
      const navigate = useNavigate();
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
    
        // Clear password error when user starts typing in the confirm password field
        if (name === "confirmPassword") {
          setPasswordError("");
        }
    
        // Clear email error when user starts typing in the email field
        if (name === "email") {
          setEmailError("");
        }
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Check if passwords match
        if (formData.password !== formData.confirmPassword) {
          setPasswordError("Passwords do not match");
          return;
        }
    
        try {
          const response = await makeUnauthenticatedPOSTRequest(
            "/auth/register",
            formData
          );
          if (response.message === "User created successfully") {
            const token = response.token;
            Cookies.set("token", token, { expires: 7 });
            handleLogin();
            navigate("/feed");
            console.log("User Signed up successfully");
          } else {
            console.log("Error creating a new user");
          }
        } catch (error) {
          console.error("Error signing up new User:", error);
        }
      };

      // Function to handle Google sign up
  const handleGoogleSignUp = () => {
    // Redirect user to Google sign up route
    window.location.href = "https://us-central1-mixjam-30173.cloudfunctions.net/api/auth/google";
  };

    return(
        <section className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div>
                    <img src={logo} alt="logo" className="h-28 mx-auto w-auto"/>
                    <h1 className="text-2xl font-semibold tracking-tight text-green-600">
                        Register an Account
                    </h1>
                    <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="userName" className="block text-sm font-medium text-gray-700">Username:</label>
            <input
              type="text"
              id="userName"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              className="border rounded-md px-3 py-2 w-full mt-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border rounded-md px-3 py-2 w-full mt-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            {emailError && <p className="text-red-500">{emailError}</p>}
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="border rounded-md px-3 py-2 w-full mt-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="border rounded-md px-3 py-2 w-full mt-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            {passwordError && <p className="text-red-500">{passwordError}</p>}
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md mt-4 w-full hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
          >
            Sign Up
          </button>
        </form>
        <button
          onClick={handleGoogleSignUp}
          className="bg-red-600 text-white px-4 py-2 rounded-md mt-4 w-full hover:bg-red-700 focus:outline-none focus:bg-red-700"
        >
          Sign Up with Google
        </button>
                    <div className="mt-4" >
                        <p className="text-lg">
                            Already have an account? <Link to="/login"><span className="text-red-500">Login</span></Link>
                        </p>
                    </div>

                </div>
            </div>
        </section>
    )
}
export default Register;
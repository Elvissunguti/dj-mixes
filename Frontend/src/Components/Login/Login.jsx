import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../Assets/logo.png";
import Cookies from "js-cookie";
import { makeUnauthenticatedPOSTRequest } from "../Utils/ServerHelpers";
import { useAuth } from "../Context/AuthContext";

const Login = () => {

    const [formData, setFormData] = useState({
        email: "",
        password: ""
      });
    
      const [loginError, setLoginError] = useState("");
      const { handleLogin } = useAuth();
      const navigate = useNavigate();
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
        
        // Reset login error when user starts typing
        setLoginError("");
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await makeUnauthenticatedPOSTRequest("/auth/login", formData);
            if (response.success) {
                // Set token in cookie
                const token = response.token;
                Cookies.set("token", token, { expires: 7 });
    
                handleLogin();
    
                // Redirect user to desired page
                navigate("/feed");
            } else {
                setLoginError(response.message);
            }
        } catch (error) {
            console.error("Error logging in:", error);
            setLoginError("Error logging in. Please try again later.");
        }
    };

    const handleGoogleLogin = () => {
        // Redirect to the Google login route
        window.location.href = "https://us-central1-mixjam-30173.cloudfunctions.net/api/auth/google";
      };
  

    return(
        <section className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div>
                    <form className="mt-8 space-y-8" onSubmit={handleSubmit}>
                        <img src={logo} alt="logo" className="mx-auto h-28 w-auto" />
                        <h1 className="text-2xl font-bold tracking-tight text-green-600">Login to your account</h1>
                        <div>
                            <label htmlFor="email" className="block flex flex-start font-bold text-lg">
                                Email
                            </label>
                            <input
                            type="email"
                            name="email"
                            autoComplete="email"
                            id="email"
                            required
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            className="relative px-3 py-2 w-full rounded-none rounded-b-md border border-gray-300 text-white placeholder-green-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label htmlFor="password"
                             className="flex flex-start font-bold text-lg">
                                Password
                            </label>
                            <input
                            type="password"
                            name="password"
                            id="password"
                            required
                            value={formData.password}
                            placeholder="Password"
                            onChange={handleChange}
                            className="relative px-3 py-2 w-full text-white placeholder-green-500 rounded-none rounded-b-md border border-gray-300 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm placeholder-gray-500 "
                            />
                        </div>
                        <div>
                            <div className="text-center  font-medium text-red-500 md:text-lg my-2">
                            {loginError && <p className="text-red-500 text-sm">{loginError}</p>}
                            </div>
                        <div>
                            <button type="submit"
                             className="group relative flex w-full justify-center rounded-md border border-transparent text-white bg-green-500 py-2 px-4 text-lg font-medium hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-[#40AA54]-500 focus:ring-offset-2 cursor-pointer " >
                                Login
                            </button>
                        </div>
                        </div>
                    </form>
                    <button
                      onClick={handleGoogleLogin}
                      className="bg-red-600 text-white px-4 py-2 rounded-md mt-4 w-full hover:bg-red-700 focus:outline-none focus:bg-red-700"
                     >
                         Login with Google
                    </button>
                    <div className="mt-4">
                        <p className="text-lg">
                            Don't have an account? <Link to='/register' ><span className="text-red-500">Register</span></Link>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Login;
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../Assets/logo.png";
import { useCookies } from "react-cookie";

const Login = () => {

    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ cookies, setCookies ] = useCookies(["token"]);
    const [ error, setError ] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        const userData = {
            email: email,
            password: password
        };

        try {
            //
            const response = await fetch("http://localhost:3000/auth/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData)
            });

            if (response.ok){
                // extract  the token from the response
                
                const token = response.token;
                const date = new Date();
                date.setDate(date.getDate() + 30);
                setCookies("token", token, {path:"/", expires: date })
                // User signed up successfully
                navigate("/");
                console.log("User Signed up successfully");
            } else {
                console.error("Sign up failed");
                setError("Wrong Email or password");
            }

        } catch (error){
            // handle any network or server error
            console.error("Error:", error)
        }
    };
  

    return(
        <section className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div>
                    <form className="mt-8 space-y-8" onSubmit={handleLogin}>
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
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="relative px-3 py-2 w-full rounded-none rounded-b-md border border-gray-300 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm placeholder-gray-500"
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
                            value={password}
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            className="relative px-3 py-2 w-full text-gray-900 placeholder-gray-500 rounded-none rounded-b-md border border-gray-300 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm placeholder-gray-500 "
                            />
                        </div>
                        <div>
                            <div className="text-center text-red-500 md:text-lg">
                                <p>{error} </p>
                            </div>
                        <div>
                            <button type="submit"
                             className="group relative flex w-full justify-center rounded-md border border-transparent text-white bg-green-500 py-2 px-4 text-lg font-medium hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-[#40AA54]-500 focus:ring-offset-2 cursor-pointer " >
                                Login
                            </button>
                        </div>
                        </div>
                    </form>
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
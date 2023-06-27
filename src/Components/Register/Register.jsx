import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../Assets/logo.png";

const Register = () => {

    const [ userName, setUserName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    return(
        <section className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div>
                    <img src={logo} alt="logo" className="h-28 mx-auto w-auto"/>
                    <h1 className="text-xl font-semibold">
                        Register an Account
                    </h1>
                    <form className="mt-8 space-y-8">
                        <div className="block">
                            <label htmlFor="userName" className="flex flex-start block">
                                Username
                            </label>
                            <input
                            type="userName"
                            name="userName"
                            id="UserName"
                            autoComplete="current-userName"
                            required
                            value={userName}
                            placeholder="Username"
                            onChange={(e) => setUserName(e.target.value)}
                            className="block relative w-full px-3 py-2 rounded-none rounded-t-md border border-gray-300 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 "
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="flex flex-start block">
                                Email
                            </label>
                            <input
                            type="email"
                            name="email"
                            id="email"
                            autoComplete="email"
                            required
                            value={email}
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                            className="block relative w-full px-3 py-2 rounded-none rounded-t-md border border-gray-300 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="flex flex-start block">
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
                            className="block relative w-full px-3 py-2 rounded-none rounded-t-md border border-gray-300 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                            />
                        </div>
                        <div>
                            <button type="submit"
                             className="group relative flex w-full justify-center rounded-md border border-transparent text-white bg-green-500 py-2 px-4 text-lg font-medium hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-[#40AA54]-500 focus:ring-offset-2 cursor-pointer">
                                Register
                            </button>
                        </div>
                    </form>
                    <div>
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
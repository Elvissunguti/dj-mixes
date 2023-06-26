import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {

    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");



    return(
        <section>
            <div>
                <div>
                    <form>
                        <h1>Login</h1>
                        <div>
                            <label htmlFor="email">
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
                            className=""
                            />
                        </div>
                        <div>
                            <label htmlFor="password">
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
                            className=""
                            />
                        </div>
                        <div>
                            <button type="submit"
                             className="" >
                                Login
                            </button>
                        </div>
                    </form>
                    <div>
                        <p>
                            Don't have an account? <Link><span>Register</span></Link>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Login;
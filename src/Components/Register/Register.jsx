import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {

    const [ userName, setUserName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    return(
        <section>
            <div>
                <div>
                    <h1>
                        Register an Account
                    </h1>
                    <form>
                        <div>
                            <label>
                                UserName
                            </label>
                            <input
                            type="userName"
                            name="userName"
                            id="UserName"
                            autoComplete="current-userName"
                            required
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            className=""
                            />
                        </div>
                        <div>
                            <label>
                                Email
                            </label>
                            <input
                            type="email"
                            name="email"
                            id="email"
                            autoComplete="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className=""
                            />
                        </div>
                        <div>
                            <label>
                                password
                            </label>
                            <input
                            type="password"
                            name="password"
                            id="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className=""
                            />
                        </div>
                        <div>
                            <button type="submit"
                             className="">
                                Register
                            </button>
                        </div>
                    </form>
                    <div>
                        <p>
                            Already have an account? <Link to="/login"><span>Login</span></Link>
                        </p>
                    </div>

                </div>
            </div>
        </section>
    )
}
export default Register;
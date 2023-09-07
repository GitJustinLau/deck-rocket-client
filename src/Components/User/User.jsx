import './User.scss';

import axios from "axios";
import Dashboard from "../Dashboard/Dashboard";
import Login from "../Login/Login";
import Signup from "../Signup/Signup";
import { useEffect, useState } from "react";

const User = () => {
    const [user, setUser] = useState(null);
    const [loginState, setLoginState] = useState(false)
    const [expanded, setExpanded] = useState(false)
    const [loggingIn, setLoggingIn] = useState(true)

    useEffect(() => {
        authentication()
    }, []);

    const authentication = async () => {
        const token = sessionStorage.getItem("token");
        try {
            if (!token) { return setLoginState(false) }
            const res = await axios.get(`${process.env.REACT_APP_URL}/users/current`, {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            })
            setUser(res.data.username);
            setLoginState(true)
        }
        catch (error) {
            console.log(error);
            setLoginState(false);
        };
    }

    const handleLogIn = () => setLoginState(true)
    const handleLogOut = () => setLoginState(false)

    const handleExpand = () => setExpanded(!expanded)

    const handleSignUp = () => setLoggingIn(false)
    const handleLoggingIn = () => setLoggingIn(true)

    return (
        <section className="user" >
            <div className="user__header" onClick={handleExpand}>
                <h2 className='user__username'>{loginState && user ? `${user}` : `Log in`}</h2>
                <div className='user__pfp-frame'>.</div>
            </div>
            <div className="user__expanded">
                {expanded && loginState && <Dashboard handleLogOut={handleLogOut}  />}
                {expanded && !loginState && loggingIn && <Login handleLogIn={handleLogIn} handleSignUp={handleSignUp} />}
                {expanded && !loggingIn && <Signup handleLoggingIn={handleLoggingIn}  />}
            </div>
        </section>


    )
}

export default User;
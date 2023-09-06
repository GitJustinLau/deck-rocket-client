import { useNavigate } from 'react-router-dom';
import './Header.scss';
import axios from 'axios';
import { useEffect, useState } from 'react';

const Header = ({ loginState }) => {

    const navigate = useNavigate()
    const [user, setUser] = useState(null);
    const [failedAuth, setFailedAuth] = useState(false);

    useEffect(() => {
        authentication()
    }, [loginState]);

    const authentication = async () => {
        const token = sessionStorage.getItem("token");
        try {
            if (!token) { return setFailedAuth(true) }
            const res = await axios.get(`${process.env.REACT_APP_URL}/users/current`, {
                headers: {
                    authorization: `Bearer ${token}`,
                },
            })
            setUser(res.data.username);
        }
        catch (error) {
            console.log(error);
            setFailedAuth(true);
        };
    }
    const handleClick = () => {
        navigate('/')
    }
    return (
        <header className='header'>
            <div className="header__logo">
                <h2>DECKROCKET 🚀🚀🚀</h2>
            </div>
            <div className="header__user" onClick={handleClick}>
                <h2 className='header__username'>{!failedAuth ? `${user}` : `Log in`}</h2>
                <div className='header__pfp-frame'></div>
            </div>
        </header>
    )
}

export default Header;
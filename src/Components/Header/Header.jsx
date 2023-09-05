import { useNavigate } from 'react-router-dom';
import './Header.scss';

const Header = () => {
    const navigate = useNavigate()
    const handleClick = () => {
        navigate('/')
    }
    return (
        <header className='header'>
            <div className="header__logo">
                <h2>DECKROCKET 🚀🚀🚀</h2>
            </div>
            <div className="header__user" onClick={handleClick}>
                {/* <img src="" alt="user profile picture" className="header__pfp" /> */}
            </div>
        </header>
    )
}

export default Header;
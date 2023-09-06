import './Header.scss';
import User from '../User/User';

const Header = () => {

    return (
        <header className='header'>
            <div className="header__logo">
                <h2>DECKROCKET 🚀🚀🚀</h2>
            </div>
            <User />
        </header>
    )
}

export default Header;
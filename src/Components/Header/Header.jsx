import './Header.scss';

const Header = () => {
    return (
       <header className='header'>
        <div className="header__logo">
            <h2>DECKROCKET 🚀🚀🚀</h2>
        </div>
        <div className="header__user">
            {/* <img src="" alt="user profile picture" className="header__pfp" /> */}
        </div>
       </header> 
    )
}

export default Header;
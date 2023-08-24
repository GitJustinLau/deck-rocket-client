import { useState } from 'react'
import axios from 'axios';

import LoadingIcon from '../LoadingIcon/LoadingIcon';

const SearchBar = (addCard) => {

    const [searchInput, setSearchInput] = useState("");
    const [inputList, setInputList] = useState(null);
    const [active, setActive] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    let delay;
    const handleInputChange = (e) => {

        e.preventDefault();
        setSearchInput(e.target.value);
        setIsLoading(true)
        clearTimeout(delay);

        if (searchInput) {
            delay = setTimeout(() => {
                axios
                    .get(`${process.env.REACT_APP_CARDSEARCH_URL}/cardSearch?name=${e.target.value}`)
                    .then((res) => {
                        console.log('api', res.data);
                        const searchResults = res.data.slice(0, 15)
                        setInputList(searchResults);
                        setIsLoading(false);
                    })
            }, 500);
        }
    };

    const handleFocus = () => setActive(!active);

    const handleClick = (e) => {
        addCard(e.target.value);
    }

    return (
        <>
            <input type="search" placeholder="Search here" onChange={handleInputChange} value={searchInput}
                className='search-bar' onFocus={handleFocus} onBlur={handleFocus} />
            {active && searchInput && isLoading && <LoadingIcon />}
            {active && searchInput && inputList && inputList.map((cardName, index) => {
                return <div className='search-bar__option' key={index} onClick={handleClick}>{cardName}</div>
            })}
        </>
    )
}

export default SearchBar;
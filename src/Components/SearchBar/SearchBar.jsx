import { useState } from 'react'
import axios from 'axios';

import LoadingIcon from '../LoadingIcon/LoadingIcon';

const SearchBar = ({ addCard }) => {

    const [searchInput, setSearchInput] = useState("");
    const [inputList, setInputList] = useState(null);
    const [active, setActive] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    let delay;
    const handleInputChange = async (e) => {

        e.preventDefault();
        setSearchInput(e.target.value);
        setIsLoading(true)
        clearTimeout(delay);

        if (e.target.value) {
            delay = setTimeout(async () => {
                try {
                    const search = await axios.get(`${process.env.REACT_APP_URL}/cardSearch?name=${e.target.value}`)
                    const searchResults = search.data.slice(0, 15)
                    setInputList(searchResults);
                    setIsLoading(false);
                } catch (error) {
                    console.error('Error fetching search results:', error);
                    setIsLoading(false);
                }
            }, 500);
        }
    };

    const handleFocus = () => setActive(!active);


    const handleClick = (cardName) => {
        setSearchInput("");
        addCard(cardName)
    }
    
    return (
        <>
            <input type="search" placeholder="Search here" onChange={handleInputChange} value={searchInput}
                className='search-bar' onFocus={handleFocus} onBlur={handleFocus} />
            {active && searchInput && isLoading && <LoadingIcon />}
            {searchInput && inputList && inputList.map((cardName, index) => {
                return <div className='search-bar__option' key={index} onClick={() => {handleClick(cardName)  }}>{cardName}</div>
            })}
        </>
    )
}

export default SearchBar;
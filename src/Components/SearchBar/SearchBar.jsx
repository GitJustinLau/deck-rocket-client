import { useState } from 'react'
import axios from 'axios';

const SearchBar = () => {

    const [searchInput, setSearchInput] = useState("");
    const [inputList, setInputList] = useState("");
    const [active, setActive] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
        
        if (!isLoading) {
            setIsLoading(true)
            axios
            .get(process.env.REACT_APP_CARDSEARCH_URL + e.target.value)
            .then((res) => {
                setInputList(res.data)
                setIsLoading(false)
            })
        }
    };

    const handleFocus = () => setActive(!active);

    return (
        <>
            <input type="search" placeholder="Search here" onChange={handleInputChange} value={searchInput} 
            className='search-bar' onFocus={handleFocus} onBlur={handleFocus}/>
            {active && searchInput && inputList && inputList.map((cardName) => {
                return <div className='search-bar__option'>{cardName}</div>
            })}
        </>
    )
}

export default SearchBar;
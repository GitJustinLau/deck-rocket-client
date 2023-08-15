import { useState } from 'react'
import axios from 'axios';

const SearchBar = () => {

    const [searchInput, setSearchInput] = useState("");
    const [inputList, setInputList] = useState("");
    const [active, setActive] = useState(false);

    const handleInputChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
        axios
            .get(process.env.REACT_APP_CARDSEARCH_URL)
            .then((res) => {
                setInputList(res.data)
            })

    };

    const handleFocus = () => setActive(!active);


    return (
        <>
            <input type="search" placeholder="Search here" onChange={handleInputChange} value={searchInput} 
            className='search-bar' onFocus={handleFocus} onBlur={handleFocus}/>
            {active && inputList.map((cardName) => {
                return <div className='search-bar__option'>{cardName}</div>
            })}
        </>
    )
}

export default SearchBar;
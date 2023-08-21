import axios from "axios";
import SearchBar from "../../Components/SearchBar/SearchBar";

const activeDecklist = () => {

    const addCard = (cardName) => {
        axios
            .get(process.env.REACT_APP_)
    }

    return (
        <main className="active">
            <SearchBar addCard={addCard}/>
        </main>
    )
}

export default activeDecklist;
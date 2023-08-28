import axios from "axios";
import SearchBar from "../../Components/SearchBar/SearchBar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ActiveDecklist = () => {
    const { decklistId } = useParams();
    const [cards, setCards] = useState([])

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_URL}/decklists/${decklistId}`)
            .then((res) => {
                setCards(res.data)
            })
    }, [])

    const addCard = (cardName) => {
        // axios
        //     .get(process.env.REACT_APP_)
    }

    return (
        <main className="active">
            <SearchBar addCard={addCard} />
            <section>
                {cards.map((card) => {
                    <article>
                        <p>{card}</p>
                    </article>
                })}
            </section>
        </main>
    )
}

export default ActiveDecklist;
import axios from "axios";
import SearchBar from "../../Components/SearchBar/SearchBar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ActiveDecklist = () => {
    const { decklistId } = useParams();
    const [cards, setCards] = useState([])

    const fetchData = async () => {
        try {
            const result = await axios.get(`${process.env.REACT_APP_URL}/decklists/${decklistId}`)
            console.log("result.data", result.data)
            setCards(result.data)
        } catch (err) {
            console.error('Error fetching decklist:', err);
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    const addCard = async (cardName) => {
        try {
            await axios.post(`${process.env.REACT_APP_URL}/decklists/${decklistId}`, {
                cardName: cardName
            })
            fetchData()
        } catch (err) {
            console.error('Error adding card:', err);
        }
    }

    return (
        <main className="active">
            <SearchBar addCard={addCard} />
            <section>
                {cards.map((card, index) => {
                    return <article key={index}>
                        <p>{card.name}</p>
                    </article>
                })}
            </section>
        </main>
    )
}

export default ActiveDecklist;
import axios from "axios";
import SearchBar from "../../Components/SearchBar/SearchBar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './ActiveDecklist.scss';
import cardBack from '../../assets/images/magic_card_back.jpg';

const ActiveDecklist = () => {
    const { decklistId } = useParams();
    const [cards, setCards] = useState([])
    const [selected, setSelected] = useState()
    const [selectedImg, setSelectedImg] = useState(null)

    const fetchData = async () => {
        try {
            const result = await axios.get(`${process.env.REACT_APP_URL}/decklists/${decklistId}`)
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

    const handleSelect = (index, url) => {
        setSelected(index)
        setSelectedImg(url || cardBack)

    }

    return (
        <main className="active">
            <section className="active__selected">
                <div className="active__visual">
                    {selectedImg && <img src={selectedImg} alt="magic card" className="active__card-img" />}
                </div>
                <div className="active__details">

                </div>
            </section>
            <section className="active__right">
                <SearchBar addCard={addCard} className="active__search" />
                <div className="active__decklist">
                    {cards.map((card, index) => {
                        return <article key={index} className="active__bar">
                            <p className={selected === index ? "active__name--selected" : "active__name"} onClick={() => { handleSelect(index, card.imageUrl) }}>{card.name}</p>
                        </article>
                    })}
                </div>
            </section>

        </main>
    )
}

export default ActiveDecklist;
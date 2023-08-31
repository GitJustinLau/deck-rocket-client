import axios from "axios";
import SearchBar from "../../Components/SearchBar/SearchBar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './ActiveDecklist.scss';
import cardBack from '../../assets/images/magic_card_back.jpg';

const ActiveDecklist = () => {
    const { decklistId } = useParams();
    const [decklistName, setDecklistName] = useState('Your Decklist')
    const [cards, setCards] = useState([])
    const [selected, setSelected] = useState({})
    const [selectedImg, setSelectedImg] = useState(cardBack)

    const fetchData = async () => {
        try {
            const result = await axios.get(`${process.env.REACT_APP_URL}/decklists/${decklistId}`)
            setCards(result.data.cards)
            setDecklistName(result.data.name)
        } catch (err) {
            console.error('Error fetching decklist:', err);
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    const addCard = async (cardName) => {
        try {
            await axios.post(`${process.env.REACT_APP_URL}/decklists/${decklistId}`, { cardName: cardName })
            fetchData();
        } catch (err) {
            console.error('Error adding card:', err);
        }
    }

    const handleSelect = (type, index, url) => {
        setSelected({ type, index })
        setSelectedImg(url || cardBack)
    }

    const types = [
        'Artifact',
        'Conspiracy',
        'Creature',
        'Enchantment',
        'Instant',
        'Land',
        'Phenomenon',
        'Plane',
        'Planeswalker',
        'Scheme',
        'Sorcery',
        'Tribal',
        'Vanguard',
    ]

    const TypedCards = {};
    types.forEach(type => TypedCards[type] = []);

    cards.forEach(card => {
        if (TypedCards[card.types[0]]) {
            TypedCards[card.types[0]].push(card);
        }
    });

    Object.keys(TypedCards).forEach((type) => {
        if (TypedCards[type].length === 0) {
            delete TypedCards[type]
        }
    })

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
                    <h2 className="active__decklist-name">{decklistName} ({cards.length})</h2>
                    <div className="active__cards">
                        {Object.keys(TypedCards).map((type, index) => {
                            return (
                                <div className="active__type" key={index}>
                                    <article className="active__label"><h3>{type} ({TypedCards[type].length})</h3></article>
                                    {TypedCards[type].map((card, index) => {
                                        return (
                                            <article key={index} className="active__bar">
                                                <p className={selected.type === type && selected.index === index ? "active__card-name--selected" : "active__card-name"} onClick={() => { handleSelect(type, index, card.imageUrl) }}>{card.name}</p>
                                            </article>
                                        )
                                    })}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>
        </main>
    )
}

export default ActiveDecklist;
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import './ActiveDecklist.scss';
import cardBack from '../../assets/images/magic_card_back.jpg';
import Card from "../../Components/Card/Card";
import SearchBar from "../../Components/SearchBar/SearchBar";

const ActiveDecklist = () => {
    const { decklistId } = useParams();
    const [decklistName, setDecklistName] = useState('Your Decklist')
    const [cards, setCards] = useState([])
    const [selected, setSelected] = useState({})
    const [selectedImg, setSelectedImg] = useState(cardBack)
    const [selectedDetails, setSelectedDetails] = useState({})

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        try {
            const result = await axios.get(`${process.env.REACT_APP_URL}/decklists/${decklistId}`)
            setCards(result.data.cards)
            setDecklistName(result.data.name)
        } catch (err) {
            console.error('Error fetching decklist:', err);
        }
    }

    const types = ['Artifact', 'Conspiracy', 'Creature', 'Enchantment', 'Instant', 'Land',
        'Phenomenon', 'Plane', 'Planeswalker', 'Scheme', 'Sorcery', 'Tribal', 'Vanguard']
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

    const addCard = async (cardName) => {
        try {
            await axios.post(`${process.env.REACT_APP_URL}/decklists/${decklistId}/card`, { cardName: cardName })
            fetchData();
        } catch (err) {
            console.error('Error adding card:', err);
        }
    }

    const handleRemove = async (card) => {
        try {
            await axios.patch(`${process.env.REACT_APP_URL}/decklists/${decklistId}/card`, { cardId: card.id })
            fetchData();
        } catch (err) {
            console.error('Error removing card:', err);
        }
    }

    const handleSelect = (type, index, card) => {
        setSelected({ type, index })
        setSelectedImg(card.imageUrl || cardBack)
        setSelectedDetails(card)
    }

    return (
        <main className="active">
            <section className="active__selected">
                <div className="active__visual">
                    <img src={selectedImg} alt="magic card" className="active__card-img" />
                </div>
                <div className="active__details-box">
                    {selectedDetails.name && <h3 className="active__details">{selectedDetails.name}</h3>}
                    {selectedDetails.cmc && <p className="active__details">cmc: {selectedDetails.cmc}</p>}
                    {selectedDetails.manaCost && <p className="active__details">{selectedDetails.manaCost}</p>}
                    {selectedDetails.power && <p className="active__details">power: {selectedDetails.power}</p>}
                    {selectedDetails.toughness && <p className="active__details">toughness: {selectedDetails.toughness}</p>}
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
                                {TypedCards[type].map((card, index) => <Card key={index} type={type} card={card} index={index} selected={selected} handleSelect={handleSelect} handleRemove={handleRemove} />)}
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
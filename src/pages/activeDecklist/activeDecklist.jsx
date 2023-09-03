import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import './ActiveDecklist.scss';
import cardBack from '../../assets/images/magic_card_back.jpg';
import Card from "../../Components/Card/Card";
import SearchBar from "../../Components/SearchBar/SearchBar";
import SideBar from "../../Components/SideBar/SideBar";
import CardDetails from "../../Components/CardDetails/CardDetails";

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

    const types = ['Artifact', 'Battle', 'Conspiracy', 'Creature', 'Dungeon', 'Enchantment', 'Instant', 'Land',
        'Phenomenon', 'Plane', 'Planeswalker', 'Scheme', 'Sorcery', 'Tribal', 'Vanguard']
    const TypedCards = {};
    types.forEach(type => TypedCards[type] = []);
    cards.forEach(card => {
        let cardTypeIndex = -1
        card.types.forEach((type) => {if (cardTypeIndex === -1) {cardTypeIndex = types.indexOf(type)}})
        TypedCards[types[cardTypeIndex]].push(card); // cardTypeIndex = -1 will never happen, all cards in magic have at least one type in 'types' array
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

    const handleRemove = async (card, type, index) => {
        try {
            if (selected.type === type && selected.index === index) {
                setSelectedImg(cardBack)
                setSelectedDetails({})
                setSelected({})
            }
            await axios.patch(`${process.env.REACT_APP_URL}/decklists/${decklistId}/card`, { cardId: card.id })
            fetchData();
        } catch (err) {
            console.error('Error removing card:', err);
        }
    }

    const handleSelect = (type, index, card) => {
        setSelectedImg(card.imageUrl || cardBack)
        setSelected({ type, index })
        setSelectedDetails(card)
    }

    return (
        <>
            <SideBar />
            <main className="active">
                <section className="active__selected">
                    <div className="active__visual">
                        <img src={selectedImg} alt="magic card" className="active__card-img" />
                    </div>
                    <CardDetails selectedDetails={selectedDetails} />
                </section>
                <section className="active__right">
                    <SearchBar addCard={addCard} className="active__search" />
                    <div className="active__decklist">
                        <h2 className="active__name">{decklistName} ({cards.length})</h2>
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
        </>
    )
}

export default ActiveDecklist;
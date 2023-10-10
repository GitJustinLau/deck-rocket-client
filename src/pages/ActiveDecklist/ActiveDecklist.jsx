import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './ActiveDecklist.scss';
import Tilt from 'react-parallax-tilt';

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
    const [selectedDetailsInput, setSelectedDetailsInput] = useState({})

    useEffect(() => {
        if (decklistId) {
            fetchData(decklistId);
        } else {
            setCards([])
            setDecklistName("new decklist")
        }
    }, [decklistId])

    const fetchData = async (id) => {
        try {
            const result = await axios.get(`${process.env.REACT_APP_URL}/decklists/${id}`)
            console.log(result.data.cards)
            setCards(result.data.cards)
            setDecklistName(result.data.name)
        } catch (err) {
            console.error('Error fetching decklist:', err);
        }
    }

    const types = ['Artifact', 'Battle', 'Conspiracy', 'Creature', 'Dungeon', 'Enchantment', 'Instant', 'Land',
        'Phenomenon', 'Plane', 'Planeswalker', 'Scheme', 'Sorcery', 'Tribal', 'Vanguard']
    const TypedCards = {};
    let deckCmc = [];
    types.forEach(type => TypedCards[type] = []);
    cards.forEach(card => {
        let cardTypeIndex = -1
        card.types.forEach((type) => { if (cardTypeIndex === -1) { cardTypeIndex = types.indexOf(type) } })
        TypedCards[types[cardTypeIndex]].push(card); // cardTypeIndex = -1 will never happen, all cards in magic have at least one type in 'types' array
        if (!card.types.includes("Land")) {
            deckCmc.push(card.cmc)
        }
    });
    Object.keys(TypedCards).forEach((type) => {
        if (TypedCards[type].length === 0) {
            delete TypedCards[type]
        }
    })
    deckCmc = Array.from(new Set(deckCmc)).sort()
    const addCard = async (cardName) => {
        try {
            await axios.post(`${process.env.REACT_APP_URL}/decklists/${decklistId}/card`, { cardName: cardName })
            fetchData(decklistId);
        } catch (err) {
            console.error('Error adding card:', err);
        }
    }

    const handleRemove = async (card, type, index) => {
        try {
            if (selected.type === type && selected.index === index) {
                setSelectedImg(cardBack)
                setSelectedDetailsInput({})
                setSelected({})
            }
            await axios.patch(`${process.env.REACT_APP_URL}/decklists/${decklistId}/card`, { cardId: card.id, updateColumn: "is_removed", updateValue: true })
            fetchData(decklistId);
        } catch (err) {
            console.error('Error removing card:', err);
        }
    }

    const handleSelect = (type, index, card) => {
        setSelectedImg(card.imageUrl || cardBack)
        setSelected({ type, index })
        setSelectedDetailsInput(card)
    }

    const handleQTYBlur = async (quantity, card, type, index) => {
        try {
            await axios.patch(`${process.env.REACT_APP_URL}/decklists/${decklistId}/card`, { cardId: card.id, updateColumn: "quantity", updateValue: quantity })
            if (quantity === '0') {
                handleRemove(card, type, index)
            } else {
                fetchData(decklistId);
            }
        } catch (err) {
            console.error('Error updating qty:', err);
        }
    }

    return (
        <>
            <SideBar TypedCards={TypedCards} deckCmc={deckCmc} cards={cards} />
            <main className="active">
                <section className="active__selected">
                    <div className="active__visual">
                        <Tilt className="active_tilt">
                            <img src={selectedImg} alt="magic card" className="active__card-img" />
                        </Tilt>
                    </div>
                    <CardDetails card={selectedDetailsInput} />
                </section>
                <section className="active__right">
                    <SearchBar addCard={addCard} className="active__search" />
                    <div className="active__decklist">
                        <h2 className="active__name">{decklistName} ({cards.reduce((acc, cur) => acc + cur.quantity, 0)})</h2>
                        <div className="active__cards">
                            {Object.keys(TypedCards).map((type, typeIndex) => {
                                return (
                                    <div className="active__type" key={typeIndex}>
                                        <article className="active__label"><h3>{type} ({TypedCards[type].length})</h3></article>
                                        {TypedCards[type].map((card, cardIndex) => <Card key={card.id} cardType={type} card={card} index={cardIndex} selected={selected} handleSelect={handleSelect} handleRemove={handleRemove} handleQTYBlur={handleQTYBlur} />)}
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
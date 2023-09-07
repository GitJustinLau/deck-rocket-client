import './Card.scss';
import { useEffect, useState } from 'react';

import cardBack from '../../assets/images/magic_card_back.jpg';
import dropdown from '../../assets/icons/chevron-down-svgrepo-com.svg';

const Card = ({ cardType, card, index, selected, handleSelect, handleRemove, handleQTYBlur }) => {

    const [hovered, setHovered] = useState({})
    const [activeDropdown, setActiveDropdown] = useState({})
    const [quantity, setQuantity] = useState(1)

    useEffect(() => {
        setQuantity(card.quantity)
    }, [card.quantity])

    const handleCardFocus = (type, index) => setHovered({ type, index })
    const handleCardBlur = () => setHovered({})

    const handledropdown = (type, index) => setActiveDropdown({ type, index })
    const handleDropdownBlur = () => setActiveDropdown({})

    const handleQTYChange = (e) => {
        setQuantity(e.target.value)
    }

    return (
        <article onMouseEnter={() => { handleCardFocus(cardType, index) }} onMouseLeave={handleCardBlur} className={selected.type === cardType && selected.index === index ? "card__bar--selected" : "card__bar"} >
            {hovered.type === cardType && hovered.index === index && <img src={card.imageUrl || cardBack} alt={card.name} className="card__hoverImg" />}
            <input type="number" className="card__quantity" min={0} onChange={handleQTYChange} value={quantity} onBlur={() => { handleQTYBlur(quantity, card, cardType, index) }} />
            <p className="card__name" onClick={() => { handleSelect(cardType, index, card) }}>{card.name}</p>
            <div className="card__dropdown" onBlur={handleDropdownBlur} tabIndex="0">
                <img src={dropdown} alt="dropdown icon" className="card__dropdown-icon" onClick={() => { handledropdown(cardType, index) }} />
                {activeDropdown.type === cardType && activeDropdown.index === index &&
                    <div className="card__dropdown-item" onClick={() => { handleRemove(card, cardType, index) }}>
                        <p className='card__dropdown-text'>Remove Card</p>
                    </div>}
            </div>
        </article>
    )
}

export default Card;
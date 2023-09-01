import './Card.scss';
import { useState } from 'react';

import cardBack from '../../assets/images/magic_card_back.jpg';
import dropdown from '../../assets/icons/chevron-down-svgrepo-com.svg';

const Card = ({ type, card, index, selected, handleSelect, handleRemove }) => {

    const [hovered, setHovered] = useState({})
    const [activeDropdown, setActiveDropdown] = useState({})

    const handleCardFocus = (type, index) => setHovered({ type, index })
    const handleCardBlur = () => setHovered({})

    const handledropdown = (type, index) => {
        setActiveDropdown({ type, index })
    }
    const handleDropdownBlur = () => {
        setActiveDropdown({});
    }

    return (
        <article onMouseEnter={() => { handleCardFocus(type, index) }} onMouseLeave={handleCardBlur} className={selected.type === type && selected.index === index ? "card__bar--selected" : "card__bar"} >
            {hovered.type === type && hovered.index === index && <img src={card.imageUrl || cardBack} alt={card.name} className="card__hoverImg" />}
            <p className="card__name" onClick={() => { handleSelect(type, index, card) }}>{card.name}</p>
            <div className="card__dropdown" onBlur={handleDropdownBlur} tabIndex="0">
                <img src={dropdown} alt="dropdown icon" className="card__dropdown-icon" onClick={() => { handledropdown(type, index) }} />
                {activeDropdown.type === type && activeDropdown.index === index &&
                    <div className="card__dropdown-item" onClick={() => { handleRemove(card, type, index) }}>
                        <p className='card__dropdown-text'>Remove Card</p>
                    </div>}
            </div>
        </article>
    )
}

export default Card;
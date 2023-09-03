import './CardDetails.scss';

const CardDetails = ({ card }) => {

    return (
        <article className="details__container">
            {card.name && <h2 className="details__name">{card.name}</h2>}
            {Object.keys(card).length > 0 &&
                <div className="details__wrapper">
                    <div className="details__mana-cost">
                        {card.manaCostArr && card.manaCostArr.map((symbol, index) => {
                            if (index % 2 !== 0) {
                                return <img src={`${process.env.REACT_APP_URL}/images/${symbol}.png`} alt={`mana cost - ${symbol}`} className="details__symbol" />
                            } else {
                                return
                            }
                        })}
                    </div>
                    {card.types && <p className='details__detail'>{card.types.join(' ')}</p>}
                    <div className="details__pt">
                        {card.power && <p className="details__detail">Power: {card.power}</p>}
                        {card.toughness && <p className="details__detail">Toughness: {card.toughness}</p>}
                    </div>
                </div>}
            <p className="details__card-text">
                {card.textArr && card.textArr.map((text, index) => {
                    if (index % 2 !== 0) {
                        return <span><img src={`${process.env.REACT_APP_URL}/images/${text}.png`} alt={`mana cost - ${text}`} className="details__symbol" /></span>
                    } else {
                        return <span>{text}</span>
                    }
                })}
            </p>

        </article>
    )
}

export default CardDetails;
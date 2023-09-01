import './CardDetails.scss';

const CardDetails = ({ selectedDetails }) => {
    return (
        <article className="details__container">
            {selectedDetails.name && <h2 className="details__name">{selectedDetails.name}</h2>}
            <div className="details__wrapper">
                {selectedDetails.cmc && <p className="details__details">cmc: {selectedDetails.cmc}</p>}
                {selectedDetails.manaCost && <p className="details__details">{selectedDetails.manaCost}</p>}
                {selectedDetails.power && <p className="details__details">power: {selectedDetails.power}</p>}
                {selectedDetails.toughness && <p className="details__details">toughness: {selectedDetails.toughness}</p>}
            </div>
            {selectedDetails.text && <p className="details__text">{selectedDetails.text}</p>}
        </article>
    )
}

export default CardDetails;
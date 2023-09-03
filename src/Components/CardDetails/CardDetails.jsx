import './CardDetails.scss';

const CardDetails = ({ selectedDetails }) => {
    return (
        <article className="details__container">
            {selectedDetails.name && <h2 className="details__name">{selectedDetails.name}</h2>}
            {Object.keys(selectedDetails).length > 0 &&
                <div className="details__wrapper">
                    {selectedDetails.manaCost && <p className="details__detail">{selectedDetails.manaCost}</p>}
                    {selectedDetails.types && <p className='details__detail'>{selectedDetails.types.join(', ')}</p>}
                    {selectedDetails.power && <p className="details__detail">power: {selectedDetails.power}</p>}
                    {selectedDetails.toughness && <p className="details__detail">toughness: {selectedDetails.toughness}</p>}
                </div>}
            {selectedDetails.text && <p className="details__text">{selectedDetails.text}</p>}
        </article>
    )
}

export default CardDetails;
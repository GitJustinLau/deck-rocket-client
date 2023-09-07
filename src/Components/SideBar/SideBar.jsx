import { useState } from 'react';
import './SideBar.scss';
import notes from '../../assets/icons/notes-svgrepo-com.svg'
import charts from '../../assets/icons/chart-line-svgrepo-com.svg'
import Cmc from '../Cmc/Cmc';
import TypesPolar from '../TypesPolar/TypesPolar';

const SideBar = ({ TypedCards, deckCmc, cards }) => {
    const [active, setActive] = useState("notes")
    const handleNotesClick = () => setActive("notes")
    const handleChartsClick = () => setActive("charts")

    return (
        <aside className="sidebar" >
            {active === "charts" &&
                <section className='sidebar__charts'>
                    <h2>Average CMC: {
                        (cards.reduce((acc, curr) => acc + Number(curr.cmc), 0) / cards.length).toFixed(2)
                    }</h2>
                    <Cmc TypedCards={TypedCards} deckCmc={deckCmc} />
                    <TypesPolar TypedCards={TypedCards}/>
                </section>}
            <section className='sidebar__bar'>
                <div className={active === "notes" ? "sidebar__container--active" : "sidebar__container"} onClick={handleNotesClick}>
                    <img src={notes} alt="details icon" className="sidebar__icon" />
                </div>
                <div className={active === "charts" ? "sidebar__container--active" : "sidebar__container"} onClick={handleChartsClick}>
                    <img src={charts} alt="chart icon" className="sidebar__icon" />
                </div>
            </section>
        </aside>
    )
}

export default SideBar;
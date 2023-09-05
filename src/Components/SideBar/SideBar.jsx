import { useState } from 'react';
import './SideBar.scss';
import notes from '../../assets/icons/notes-svgrepo-com.svg'
import charts from '../../assets/icons/chart-line-svgrepo-com.svg'
const SideBar = ({cards}) => {

    const [active, setActive] = useState("notes")

    const handleNotesClick = () => {
        setActive("notes")
    }

    const handleChartsClick = () => {
        setActive("charts")
    }

    return (
        <aside className="sidebar" >
            {active === "charts" && 
            <section className='sidebar__charts'>
                <h1>Come back this Thursday!</h1>
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
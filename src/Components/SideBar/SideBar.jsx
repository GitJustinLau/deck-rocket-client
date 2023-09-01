import { useState } from 'react';
import './SideBar.scss';
import notes from '../../assets/icons/notes-svgrepo-com.svg'
import chart from '../../assets/icons/chart-line-svgrepo-com.svg'
const SideBar = () => {

    const [active, setActive] = useState(false)

    const handleClick = () => setActive(true)

    return (
        <aside className="sideBar" onClick={handleClick}>
            <div className="sideBar__container">
                <img src={notes} alt="details icon" className="sideBar__icon" />
            </div>
            <div className="sideBar__container">
                <img src={chart} alt="chart icon" className="sideBar__icon" />
            </div>
        </aside>
    )
}

export default SideBar;
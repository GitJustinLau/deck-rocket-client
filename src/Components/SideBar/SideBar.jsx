import { useState } from 'react';
import './SideBar.scss';
import notes from '../../assets/icons/notes-svgrepo-com.svg'
import chart from '../../assets/icons/chart-line-svgrepo-com.svg'
const SideBar = () => {

    const [active, setActive] = useState(false)

    const handleClick = () => {
        
    }

    return (
        <aside className="sideBar" >
            <div className="sideBar__container" onClick={handleClick}>
                <img src={notes} alt="details icon" className="sideBar__icon" />
            </div>
            <div className="sideBar__container" onClick={handleClick}>
                <img src={chart} alt="chart icon" className="sideBar__icon" />
            </div>
        </aside>
    )
}

export default SideBar;
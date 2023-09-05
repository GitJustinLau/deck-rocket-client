import "./Dashboard.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import deleteIcon from '../../assets/icons/delete.svg';
import dropdown from '../../assets/icons/chevron-down-svgrepo-com.svg';

function Dashboard() {
  const [user, setUser] = useState(null);
  const [failedAuth, setFailedAuth] = useState(false);
  const [userDecklists, setUserDecklists] = useState([])
  const [errMsg, setErrMsg] = useState('')
  const [postErr, setPostErr] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState({})

  const handledropdown = (id) => setActiveDropdown({ id })
  const handleDropdownBlur = () => setActiveDropdown({})

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      return setFailedAuth(true);
    }

    // Get the data from the API
    axios
      .get(`${process.env.REACT_APP_URL}/users/current`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUser(res.data.id);
        return axios.get(`${process.env.REACT_APP_URL}/decklists/user/${res.data.id}`)
      })
      .then((res) => {
        setUserDecklists(res.data)
      })
      .catch((error) => {
        console.log(error);
        setFailedAuth(true);
      });
  }, []);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const deckName = e.target.name.value;
      e.target.name.value = "";
      await axios.post(`${process.env.REACT_APP_URL}/decklists/user/${user}`, { "name": deckName })
      const userDecklists = await axios.get(`${process.env.REACT_APP_URL}/decklists/user/${user}`)
      setUserDecklists(userDecklists.data)
    } catch (err) {
      console.log("post error:", err)
      setPostErr(true)
      setErrMsg(err.response.data.message)
      setTimeout(() => {
        setPostErr(false)
      }, 3000);
    }
  }

  const handleDel = async (decklistId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_URL}/decklists/${decklistId}`)
      const userDecklists = await axios.get(`${process.env.REACT_APP_URL}/decklists/user/${user}`)
      setUserDecklists(userDecklists.data)
    }
    catch (err) {
      console.log(err)
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setUser(null);
    setFailedAuth(true);
  };

  if (failedAuth) {
    return (
      <main className="dashboard">
        <p>You must be logged in to see this page.</p>
        <p><Link to="/login">Log in</Link></p>
      </main>
    )
  }

  if (user === null) {
    return (
      <main className="dashboard">
        <p>Loading...</p>
      </main>
    )
  }

  return (
    <main className="dashboard">
      <p>{user.username}</p>
      <button className="dashboard__logout" onClick={handleLogout}>Log out</button>
      <h2>My Decklists</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="New Decklist here..." />
        <button>icon</button>
      </form>
      {postErr && errMsg}
      {userDecklists.map((decklist) => {
        return <article key={decklist.id} className="dashboard__decklist">
          <Link to={`/decklists/${decklist.id}`}>
            <p className="dashboard__name">{decklist.name}</p>
          </Link>
          <div className="dashboard__dropdown" onBlur={handleDropdownBlur} tabIndex="0">
            <img src={dropdown} alt="dropdown icon" className="dashboard__dropdown-icon" onClick={() => { handledropdown(decklist.id) }} />
            {activeDropdown.id === decklist.id &&
              <div className="dashboard__dropdown-item" onClick={() => handleDel(decklist.id)}>
                <p className='dashboard__dropdown-text'>Remove Decklist</p>
              </div>}
          </div>
        </article>
      })}
    </main>
  );
}

export default Dashboard;

import "./Dashboard.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [failedAuth, setFailedAuth] = useState(false);
  const [userDecklists, setUserDecklists] = useState([])

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
        setUser(res.data);
        return axios.get(`${process.env.REACT_APP_URL}/decklists/${res.data.id}`)
      })
      .then((res) => {
        setUserDecklists(res.data)
      })
      .catch((error) => {
        console.log(error);
        setFailedAuth(true);
      });
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setUser(null);
    setFailedAuth(true);
  };

  if (failedAuth) {
    return (
      <main className="dashboard">
        <p>You must be logged in to see this page.</p>
        <p>
          <Link to="/login">Log in</Link>
        </p>
      </main>
    );
  }

  if (user === null) {
    return (
      <main className="dashboard">
        <p>Loading...</p>
      </main>
    );
  }

  return (
    <main className="dashboard">
      <h1 className="dashboard__title">Dashboard</h1>

      <p>
        Welcome back, {user.username}
      </p>

      <h2>My Decklists</h2>
      {userDecklists.map((decklist) => {
        return <article>
          {decklist.name}
        </article>
      })}
      <button className="dashboard__logout" onClick={handleLogout}>
        Log out
      </button>
    </main>
  );
}

export default Dashboard;

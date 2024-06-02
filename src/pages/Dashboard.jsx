import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchProtectedInfo, onLogout } from "../api/auth";
import { unauthenticateUser } from "../redux/slices/authSlice";
import axios from "axios";

import styles from "../styles/pages/Dashboard.module.css";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [protectedData, setProtectedData] = useState(null);
  const [orderedKeys, setOrderedKeys] = useState([]);

  const logout = async () => {
    try {
      await onLogout();
      dispatch(unauthenticateUser());
      localStorage.removeItem("isAuth");
    } catch (error) {
      console.log(error.response);
    }
  };

  const protectedInfo = async () => {
    try {
      const { data } = await fetchProtectedInfo();
      setProtectedData(data.info);
      setLoading(false);
    } catch (error) {
      logout();
    }
  };

  const fetchOrderedKeys = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/ordered-keys`,
        { withCredentials: true }
      );
      setOrderedKeys(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    protectedInfo();
    fetchOrderedKeys();
  }, []);

  return loading ? (
    <div className={styles.loadingContainer}>
      <h1>Loading...</h1>
    </div>
  ) : (
    <div className={styles.dashboardContainer}>
      <h1 className={styles.heading}>Dashboard</h1>
      <p className={styles.protectedData}>{protectedData}</p>
      <button className={styles.logoutButton} onClick={() => logout()}>
        Logout
      </button>
      <h2 className={styles.subheading}>Gekaufte Game Keys</h2>
      <ul className={styles.orderedKeysList}>
        {orderedKeys.map((key) => (
          <li key={key.ordered_id} className={styles.orderedKey}>
            <h3 className={styles.gameTitle}>{key.title}</h3>
            <p className={styles.gamePrice}>Preis: {key.price} €</p>
            <p className={styles.gameKey}>Key: {key.key}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;

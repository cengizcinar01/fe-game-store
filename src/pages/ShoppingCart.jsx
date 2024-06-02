import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import styles from "../styles/pages/ShoppingCart.module.css";

const ShoppingCart = () => {
  const { isAuth } = useSelector((state) => state.auth);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/cart-items`,
          { withCredentials: true }
        );
        setCartItems(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    if (isAuth) {
      fetchCartItems();
    }
  }, [isAuth]);

  const removeFromCart = async (keyId) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/remove-from-cart/${keyId}`,
        { withCredentials: true }
      );
      setCartItems(cartItems.filter((item) => item.key_id !== keyId));
    } catch (error) {
      console.error(error);
    }
  };

  const completeOrder = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/complete-order`,
        {},
        { withCredentials: true }
      );
      alert(response.data.message);
      setCartItems([]);
    } catch (error) {
      console.error(error);
      alert("Fehler beim Abschließen der Bestellung");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className={styles.cartContainer}>
      <h1>Warenkorb</h1>
      {cartItems.length === 0 ? (
        <p>Ihr Warenkorb ist leer.</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.key_id} className={styles.cartItem}>
              <img
                src={item.main_game_image}
                alt={item.title}
                className={styles.gameImage}
              />
              <div className={styles.gameDetails}>
                <h2>{item.title}</h2>
                <p>{item.genre}</p>
                <p>{item.price} €</p>
                <p>{item.description}</p>
                <button onClick={() => removeFromCart(item.key_id)}>
                  Entfernen
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      {cartItems.length > 0 && (
        <button className={styles.completeOrderBtn} onClick={completeOrder}>
          Bestellung abschließen
        </button>
      )}
      <NavLink to="/games" className={styles.navLink}>
        Weiter einkaufen
      </NavLink>
    </div>
  );
};

export default ShoppingCart;

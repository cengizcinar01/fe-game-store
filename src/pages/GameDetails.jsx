import { useState, useEffect } from "react";

import axios from "axios";
import { Link } from "react-router-dom";
import { FaXbox } from "react-icons/fa";
import { useParams } from "react-router-dom";

import { GameDetailsLoader } from "../components/Loader";

import styles from "../styles/pages/GameDetails.module.css";

const GameDetails = () => {
  const { gameId } = useParams();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOneGame = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/games/${gameId}`
        );
        setGame(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchOneGame();
  }, [gameId]);

  if (loading) {
    return (
      <>
        <div
          className={styles.breadcrumb_container}
          style={{ marginBottom: "3.1rem" }}
        ></div>
        <div className={styles.container} style={{ padding: "0" }}>
          <GameDetailsLoader />
        </div>
      </>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <div className={styles.breadcrumb_container}>
        <span>
          <Link to="/games">Games</Link> / {game.title}
        </span>
      </div>
      <div className={styles.container}>
        <img
          src={game.main_game_image}
          alt={game.title}
          className={styles.image}
        />
        <div className={styles.details}>
          <h1 className={styles.title}>{game.title}</h1>
          <p className={styles.genre}>{game.genre}</p>
          <p className={styles.price}>{game.price} €</p>
          <p className={styles.description}>{game.description}</p>
          <div className={styles.xbox_icon}>
            Verfügbar für
            <FaXbox />
          </div>
          <button className={styles.cart_btn}>In den Warenkorb</button>
        </div>
      </div>
    </>
  );
};

export default GameDetails;

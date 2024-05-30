import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "../styles/pages/GameDetails.module.css";

const GameDetails = () => {
  const { gameId } = useParams();
  const [game, setGame] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOneGame = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/games/${gameId}`
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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          <img
            src={game.main_game_image}
            alt={game.title}
            className={styles.image}
          />
        </div>
        <div className={styles.details}>
          <h1 className={styles.title}>{game.title}</h1>
          <p className={styles.genre}>{game.genre}</p>
          <p className={styles.description}>{game.description}</p>
          <p className={styles.price}>{game.price} €</p>
        </div>
      </div>
    </>
  );
};

export default GameDetails;

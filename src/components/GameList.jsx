import { useState, useEffect } from "react";
import axios from "axios";
import styles from "../styles/components/GameList.module.css";
import { FaXbox } from "react-icons/fa";

const GameList = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllGames = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/games`
        );
        setGames(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchAllGames();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <div className={styles.games_grid}>
        {games.map((game) => (
          <div className={styles.game_container} key={game.id}>
            <img
              className={styles.game_img}
              src={game.main_game_image}
              alt={game.title}
            />
            <div className={styles.game_info}>
              <h2 className={styles.game_title}>
                {game.title.length > 15
                  ? `${game.title.slice(0, 15)}...`
                  : game.title}
              </h2>
              <div className={styles.game_details}>
                <span className={styles.game_price}>
                  {Number(game.price).toLocaleString("de-DE", {
                    style: "currency",
                    currency: "EUR",
                  })}
                </span>
                <div className={styles.game_platform}>
                  <FaXbox />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default GameList;

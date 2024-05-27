import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./styles/Games.module.css";

const Games = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/games`
        );
        setGames(response.data);
      } catch (error) {
        console.error("Fehler beim Abrufen der Spiele", error);
      }
    };

    fetchGames();
  }, []);

  return (
    <>
      <h1>Spiele</h1>
      <div className={styles.games_grid}>
        {games.map((game) => (
          <div className={styles.game_container} key={game.id}>
            <img
              className={styles.game_img}
              src={game.main_game_image}
              alt=""
            />
            <div className={styles.game_title_price_container}>
              <h2 className={styles.game_title}>{game.title}</h2>
              <span className={styles.game_price}>
                {Number(game.price).toLocaleString("de-DE", {
                  style: "currency",
                  currency: "EUR",
                })}
              </span>
              <div className={styles.game_platform}></div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Games;

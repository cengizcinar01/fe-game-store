import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "../styles/components/GameList.module.css";
import { FaXbox } from "react-icons/fa";
import { VscSettings } from "react-icons/vsc";
import { GameListLoader } from "./Loader";

const GameList = ({ toggleFilter }) => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllGames = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/get-games`
        );
        if (response.data.success) {
          setGames(response.data.games);
        } else {
          setError(new Error("Failed to fetch games"));
        }
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchAllGames();
  }, []);

  if (loading) {
    return (
      <>
        <div className={styles.games_grid}>
          {Array.from({ length: 8 }).map((_, index) => (
            <GameListLoader key={index} />
          ))}
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <div className={styles.games_grid}>
          <div>Error: {error.message}</div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className={styles.filter_icon_mobile_container}>
        <div className={styles.filter_icon_mobile} onClick={toggleFilter}>
          <VscSettings />
        </div>
        <div className={styles.games_grid}>
          {games.map((game) => (
            <Link to={`/games/${game.game_id}`} key={game.game_id}>
              <div className={styles.game_container}>
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
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default GameList;

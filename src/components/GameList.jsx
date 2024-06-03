import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaXbox } from "react-icons/fa";
import { VscSettings } from "react-icons/vsc";
import { GameListLoader } from "./Loader";
import styles from "../styles/components/GameList.module.css";

const getRandomGames = (games, max) => {
  const shuffled = games.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, max);
};

const GameList = ({
  filterCriteria = { search: "", sort: "title-asc", genres: [] },
  toggleFilter,
  maxGames = Infinity,
  hideFilterIcon = false,
}) => {
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
          const randomGames = getRandomGames(response.data.games, maxGames);
          setGames(randomGames);
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
  }, [maxGames]);

  const filteredGames = games
    .filter((game) =>
      game.title.toLowerCase().includes(filterCriteria.search.toLowerCase())
    )
    .filter((game) =>
      filterCriteria.genres.length > 0
        ? filterCriteria.genres.includes(game.genre)
        : true
    )
    .sort((a, b) => {
      if (filterCriteria.sort === "title-asc") {
        return a.title.localeCompare(b.title);
      } else if (filterCriteria.sort === "title-desc") {
        return b.title.localeCompare(a.title);
      } else if (filterCriteria.sort === "price-asc") {
        return a.price - b.price;
      } else if (filterCriteria.sort === "price-desc") {
        return b.price - a.price;
      }
      return 0;
    });

  if (loading) {
    return (
      <div className={styles.games_grid}>
        {Array.from({ length: 8 }).map((_, index) => (
          <GameListLoader key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.games_grid}>
        <div>Error: {error.message}</div>
      </div>
    );
  }

  return (
    <div className={styles.filter_icon_mobile_container}>
      {hideFilterIcon ? undefined : (
        <div className={styles.filter_icon_mobile} onClick={toggleFilter}>
          <VscSettings />
        </div>
      )}
      <div className={styles.games_grid}>
        {filteredGames.map((game) => (
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
  );
};

export default GameList;

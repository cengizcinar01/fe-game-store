import { useState, useEffect } from "react";
import GameList from "../components/GameList";
import GameFilter from "../components/GameFilter";
import axios from "axios";
import styles from "../styles/pages/Games.module.css";

const Games = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterCriteria, setFilterCriteria] = useState({
    search: "",
    sort: "title-asc",
    genres: [],
  });
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

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

  return (
    <>
      <div className={styles.left_filter_game_list_container}>
        <GameFilter
          isFilterOpen={isFilterOpen}
          toggleFilter={toggleFilter}
          filterCriteria={filterCriteria}
          setFilterCriteria={setFilterCriteria}
          gameCount={filteredGames.length}
        />
        <GameList
          filterCriteria={filterCriteria}
          toggleFilter={toggleFilter}
          games={filteredGames}
          loading={loading}
          error={error}
        />
      </div>
    </>
  );
};

export default Games;

import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./styles/Games.module.css";
import GameFilter from "../components/filter/GameFilter";
import GameList from "../components/GameList";

const Games = () => {
  const [allGames, setAllGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/games`
        );
        setAllGames(response.data);
        setFilteredGames(response.data);
      } catch (error) {
        console.error("Fehler beim Abrufen der Spiele", error);
      }
    };

    fetchGames();
  }, []);

  const handleGenreChange = (selectedGenres) => {
    if (selectedGenres.length === 0) {
      setFilteredGames(allGames);
    } else {
      const filtered = allGames.filter((game) =>
        selectedGenres.some((genre) => game.genre.includes(genre))
      );
      setFilteredGames(filtered);
    }
  };

  return (
    <>
      <div className={styles.left_filter_game_list_container}>
        <GameFilter onGenreChange={handleGenreChange} />
        <div className={styles.game_list_filter_container}>
          <GameList games={filteredGames} />
        </div>
      </div>
    </>
  );
};

export default Games;

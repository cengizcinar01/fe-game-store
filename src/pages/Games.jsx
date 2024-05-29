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

  const handleSortChange = async (selectedSort) => {
    try {
      let response;
      switch (selectedSort) {
        case "title-asc":
          response = await axios.get(
            `${import.meta.env.VITE_API_URL}/games/sort/title/asc`
          );
          break;
        case "title-desc":
          response = await axios.get(
            `${import.meta.env.VITE_API_URL}/games/sort/title/desc`
          );
          break;
        case "price-asc":
          response = await axios.get(
            `${import.meta.env.VITE_API_URL}/games/sort/price/asc`
          );
          break;
        case "price-desc":
          response = await axios.get(
            `${import.meta.env.VITE_API_URL}/games/sort/price/desc`
          );
          break;
        default:
          response = await axios.get(`${import.meta.env.VITE_API_URL}/games`);
      }
      setFilteredGames(response.data);
    } catch (error) {
      console.error("Fehler beim Abrufen der sortierten Spiele", error);
    }
  };

  const handleSearch = async (searchTerm) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/games/search?title=${searchTerm}`
      );
      setFilteredGames(response.data);
    } catch (error) {
      console.error("Fehler beim Suchen der Spiele", error);
    }
  };

  return (
    <div className={styles.left_filter_game_list_container}>
      <GameFilter
        onGenreChange={handleGenreChange}
        onSortChange={handleSortChange}
        onSearch={handleSearch}
        gameCount={filteredGames.length}
      />
      <GameList games={filteredGames} />
    </div>
  );
};

export default Games;

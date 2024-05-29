import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import styles from "./styles/Games.module.css";
import GameFilter from "../components/filter/GameFilter";
import GameList from "../components/GameList";

const Games = () => {
  const [allGames, setAllGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const currentPage = parseInt(searchParams.get("page")) || 1;

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/games?page=${currentPage}`
        );
        setAllGames(response.data.games);
        setFilteredGames(response.data.games);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Fehler beim Abrufen der Spiele", error);
      }
    };

    fetchGames();
  }, [currentPage]);

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

<<<<<<< HEAD
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
=======
  const handlePageChange = (page) => {
    navigate(`/games?page=${page}`);
  };

  return (
    <>
      <div className={styles.left_filter_game_list_container}>
        <GameFilter onGenreChange={handleGenreChange} />
        <div className={styles.game_list_pagination_container}>
          <GameList games={filteredGames} />
          <div className={styles.pagination}>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={currentPage === index + 1 ? styles.active : ""}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
>>>>>>> b9070764ff1a8bbd1a7ab689b2c159a37e73d37d
  );
};

export default Games;

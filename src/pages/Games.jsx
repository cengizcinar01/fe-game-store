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

  const handlePageChange = (page) => {
    navigate(`/games?page=${page}`);
  };

  return (
    <>
      <div className={styles.left_filter_game_list_container}>
        <GameFilter onGenreChange={handleGenreChange} />
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
    </>
  );
};

export default Games;

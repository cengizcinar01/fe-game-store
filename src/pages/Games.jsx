import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./styles/Games.module.css";
import { FaXbox } from "react-icons/fa";

const Games = () => {
  const [allGames, setAllGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);

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

    const fetchGenres = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/genres`
        );
        setGenres(response.data);
      } catch (error) {
        console.error("Fehler beim Abrufen der Genres", error);
      }
    };

    fetchGames();
    fetchGenres();
  }, []);

  useEffect(() => {
    const filterGames = () => {
      if (selectedGenres.length === 0) {
        setFilteredGames(allGames);
      } else {
        const filtered = allGames.filter((game) =>
          selectedGenres.some((genre) => game.genre.includes(genre))
        );
        setFilteredGames(filtered);
      }
    };

    filterGames();
  }, [selectedGenres, allGames]);

  const handleGenreChange = (genre) => {
    const updatedGenres = selectedGenres.includes(genre)
      ? selectedGenres.filter((g) => g !== genre)
      : [...selectedGenres, genre];
    setSelectedGenres(updatedGenres);
  };

  return (
    <>
      <div className={styles.search_box}></div>
      <div className={styles.left_top_filter_game_list_container}>
        <div className={styles.filter_left}>
          {genres.map((genre) => (
            <label key={genre}>
              <input
                type="checkbox"
                checked={selectedGenres.includes(genre)}
                onChange={() => handleGenreChange(genre)}
              />
              {genre}
            </label>
          ))}
        </div>
        <div className={styles.game_list_filter_container}>
          <div className={styles.filter_top}>
            <div>test</div>
          </div>
          <div className={styles.games_grid}>
            {filteredGames.map((game) => (
              <div className={styles.game_container} key={game.id}>
                <img
                  className={styles.game_img}
                  src={game.main_game_image}
                  alt={game.title}
                />
                <div className={styles.game_info}>
                  <h2 className={styles.game_title}>{game.title}</h2>
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
        </div>
      </div>
    </>
  );
};

export default Games;

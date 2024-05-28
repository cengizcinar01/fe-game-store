import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./styles/GameFilter.module.css";

const GameFilter = ({ onGenreChange }) => {
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);

  useEffect(() => {
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

    fetchGenres();
  }, []);

  const handleGenreChange = (genre) => {
    const updatedGenres = selectedGenres.includes(genre)
      ? selectedGenres.filter((g) => g !== genre)
      : [...selectedGenres, genre];
    setSelectedGenres(updatedGenres);
    onGenreChange(updatedGenres);
  };

  return (
    <>
      <div className={styles.filter_left}>
        <div className={styles.search}>
          <input
            className={styles.search_input}
            type="text"
            placeholder="Spiel suchen..."
          />
        </div>
        <div className={styles.select}>
          <span className={styles.sort_text}>Sortieren:</span>
          <select id="filter-select" className={styles.select_style}>
            <option value="gwegweg">A-Z</option>
            <option value="gwegweg">weg</option>
            <option value="gwegweg">weg</option>
            <option value="gwegweg">weg</option>
          </select>
        </div>
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
    </>
  );
};

export default GameFilter;

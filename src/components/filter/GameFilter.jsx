import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./styles/GameFilter.module.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

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
            <option value="title-asc">Titel: A-Z</option>
            <option value="title-desc">Titel: Z-A</option>
            <option value="price-asc">Preis: Aufsteigend</option>
            <option value="price-desc">Preis: Absteigend</option>
          </select>
        </div>
        <div className={styles.genres}>
          {genres.length > 0 ? (
            genres.map((genre) => (
              <label key={genre} className={styles.genre_label}>
                <span className={styles.genre_text}>{genre}</span>
                <input
                  type="checkbox"
                  checked={selectedGenres.includes(genre)}
                  onChange={() => handleGenreChange(genre)}
                  className={styles.genre_checkbox}
                />
              </label>
            ))
          ) : (
            <SkeletonTheme baseColor="#202020" highlightColor="#444">
              <Skeleton count={5} height={24.44} />
            </SkeletonTheme>
          )}
        </div>
      </div>
    </>
  );
};

export default GameFilter;

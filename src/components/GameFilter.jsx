import { useState, useEffect } from "react";
import axios from "axios";
import styles from "../styles/components/GameFilter.module.css";
import { GameFilterLoader } from "./Loader";

const GameFilter = ({ isFilterOpen, toggleFilter }) => {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/get-games`
        );
        setGenres(response.data.genres);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchGenres();
  }, []);

  if (loading) {
    return (
      <>
        {isFilterOpen && (
          <div className={styles.filter_close} onClick={toggleFilter}></div>
        )}
        <div
          className={`${styles.filter_left} ${
            isFilterOpen ? styles.open : undefined
          }`}
        >
          <GameFilterLoader />
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <div className={styles.filter_left}>
          <div>Error: {error.message}</div>
        </div>
      </>
    );
  }

  return (
    <>
      {isFilterOpen && (
        <div className={styles.filter_close} onClick={toggleFilter}></div>
      )}
      <div
        className={`${styles.filter_left} ${
          isFilterOpen ? styles.open : undefined
        }`}
      >
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
          {genres.map((genre) => (
            <label key={genre} className={styles.genre_label}>
              <span className={styles.genre_text}>{genre}</span>
              <input type="checkbox" className={styles.genre_checkbox} />
            </label>
          ))}
          <p className={styles.game_count}>X Spiele gefunden</p>
        </div>
      </div>
    </>
  );
};

export default GameFilter;

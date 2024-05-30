import { useState, useEffect } from "react";
import axios from "axios";
import styles from "../styles/components/GameFilter.module.css";
import { VscSettings } from "react-icons/vsc";

const GameFilter = () => {
  const [genres, setGenres] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/genres`
        );
        setGenres(response.data);
        console.log(response);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchGenres();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

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
      <div className={styles.filter_icon_mobile} onClick={toggleFilter}>
        <VscSettings />
      </div>
    </>
  );
};

export default GameFilter;

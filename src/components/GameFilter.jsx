import { useState, useEffect, useRef } from "react";
import axios from "axios";
import styles from "../styles/components/GameFilter.module.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { VscSettings } from "react-icons/vsc";

const GameFilter = ({ onGenreChange, onSortChange, onSearch, gameCount }) => {
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const searchInputRef = useRef(null);

  const handleSortChange = (event) => {
    const selectedSort = event.target.value;
    onSortChange(selectedSort);

    if (searchInputRef.current) {
      searchInputRef.current.value = "";
    }
  };

  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    onSearch(searchTerm);

    setSelectedGenres([]);
    document.getElementById("filter-select").value = "title-asc";
  };

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

    if (searchInputRef.current) {
      searchInputRef.current.value = "";
    }
  };
  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const getGameCountText = () => {
    if (gameCount === 0) {
      return "Keine Spiele gefunden";
    } else if (gameCount === 1) {
      return "1 Spiel gefunden";
    } else {
      return `${gameCount} Spiele gefunden`;
    }
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
            onChange={handleSearch}
            ref={searchInputRef}
          />
        </div>
        <div className={styles.select}>
          <span className={styles.sort_text}>Sortieren:</span>
          <select
            id="filter-select"
            className={styles.select_style}
            onChange={handleSortChange}
          >
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
          <p className={styles.game_count}>{getGameCountText()}</p>
        </div>
      </div>
      <div className={styles.filter_icon_mobile} onClick={toggleFilter}>
        <VscSettings />
      </div>
    </>
  );
};

export default GameFilter;

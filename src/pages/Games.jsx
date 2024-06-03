import { useState } from "react";
import GameList from "../components/GameList";
import GameFilter from "../components/GameFilter";
import styles from "../styles/pages/Games.module.css";

const Games = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterCriteria, setFilterCriteria] = useState({
    search: "",
    sort: "title-asc",
    genres: [],
  });

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <>
      <div className={styles.left_filter_game_list_container}>
        <GameFilter
          isFilterOpen={isFilterOpen}
          toggleFilter={toggleFilter}
          filterCriteria={filterCriteria}
          setFilterCriteria={setFilterCriteria}
        />
        <GameList
          filterCriteria={
            filterCriteria || { search: "", sort: "title-asc", genres: [] }
          }
        />
      </div>
    </>
  );
};

export default Games;

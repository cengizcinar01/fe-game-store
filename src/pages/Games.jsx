import styles from "../styles/pages/Games.module.css";
import GameList from "../components/GameList";
import GameFilter from "../components/GameFilter";

const Games = () => {
  return (
    <>
      <div className={styles.left_filter_game_list_container}>
        <GameFilter />
        <GameList />
      </div>
    </>
  );
};

export default Games;

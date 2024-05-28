import styles from "./styles/GameList.module.css";
import { FaXbox } from "react-icons/fa";

const GameList = ({ games }) => {
  return (
    <>
      <div className={styles.games_grid}>
        {games.map((game) => (
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
    </>
  );
};

export default GameList;

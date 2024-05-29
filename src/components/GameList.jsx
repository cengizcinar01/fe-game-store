import styles from "./styles/GameList.module.css";
import { FaXbox } from "react-icons/fa";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const GameList = ({ games }) => {
  if (!games || games.length === 0) {
    return (
      <div className={styles.games_grid}>
        {Array.from({ length: 12 }, (_, index) => (
          <div key={index} className={styles.game_container}>
            <SkeletonTheme baseColor="#202020" highlightColor="#333">
              <Skeleton width={280} height={200} />
              <div className={styles.game_info}>
                <Skeleton
                  width={120}
                  height={20}
                  style={{ marginBottom: "10px" }}
                />
                <div className={styles.game_details}>
                  <Skeleton width={70} height={20} />
                  <Skeleton
                    width={30}
                    height={30}
                    style={{ marginLeft: "10px" }}
                  />
                </div>
              </div>
            </SkeletonTheme>
          </div>
        ))}
      </div>
    );
  }

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
              <h2 className={styles.game_title}>
                {game.title.length > 15
                  ? `${game.title.slice(0, 15)}...`
                  : game.title}
              </h2>
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

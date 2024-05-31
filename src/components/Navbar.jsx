import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { IoGameController } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
import styles from "../styles/components/Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={styles.navbar_container}>
      <div className={styles.navbar_left}>
        <Link to="/" className={styles.navbar_logo}>
          GAME STORE
          <IoGameController className={styles.navbar_game_icon} />
        </Link>
        <div className={styles.navbar_center}>
          <Link to="/" className={styles.navbar_link}>
            Home
          </Link>
          <Link to="/games" className={styles.navbar_link}>
            Games
          </Link>
        </div>
      </div>
      <div className={styles.navbar_right}>
        <FaShoppingCart className={styles.navbar_cart_icon} />
        <FaUserCircle className={styles.navbar_user_icon} />
      </div>
    </nav>
  );
};

export default Navbar;

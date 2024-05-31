import { Link } from "react-router-dom";
import { FaUserCircle, FaShoppingCart, FaBars } from "react-icons/fa";
import { IoGameController } from "react-icons/io5";
import styles from "../styles/components/Navbar.module.css";
import { useState } from "react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className={styles.navbar_container}>
      <div className={styles.navbar_left}>
        <Link to="/" className={styles.navbar_logo}>
          <IoGameController className={styles.navbar_game_icon} />
          <span>GAME STORE</span>
        </Link>
      </div>
      <div className={styles.navbar_right}>
        <FaShoppingCart className={styles.navbar_cart_icon} />
        <FaUserCircle className={styles.navbar_user_icon} />
        <FaBars className={styles.navbar_menu_icon} onClick={toggleMenu} />
      </div>
      {menuOpen && (
        <div className={styles.navbar_menu}>
          <Link to="/" className={styles.navbar_link} onClick={toggleMenu}>
            Home
          </Link>
          <Link to="/games" className={styles.navbar_link} onClick={toggleMenu}>
            Games
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

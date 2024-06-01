import { useState, useEffect, useRef } from "react";

import { Link } from "react-router-dom";
import { IoGameController } from "react-icons/io5";
import { FaUserCircle, FaShoppingCart, FaBars } from "react-icons/fa";

import styles from "../styles/components/Navbar.module.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <nav className={styles.navbar_container}>
      <div className={styles.navbar_left}>
        <Link to="/" className={styles.navbar_logo}>
          <IoGameController className={styles.navbar_game_icon} />
          <span>GAME STORE</span>
        </Link>
      </div>
      <div className={styles.navbar_right}>
        <div className={styles.navbar_right_icons}>
          <FaShoppingCart className={styles.navbar_cart_icon} />
          <FaUserCircle className={styles.navbar_user_icon} />
          <FaBars className={styles.navbar_menu_icon} onClick={toggleMenu} />
        </div>
        {menuOpen && (
          <div className={styles.navbar_menu} ref={menuRef}>
            <Link to="/" className={styles.navbar_link} onClick={toggleMenu}>
              Home
            </Link>
            <Link
              to="/games"
              className={styles.navbar_link}
              onClick={toggleMenu}
            >
              Games
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

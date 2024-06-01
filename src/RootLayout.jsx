import { Outlet } from "react-router-dom";

import styles from "./styles/RootLayout.module.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const RootLayout = () => {
  return (
    <>
      <div className={styles.root_layout}>
        <Navbar />
        <main className={styles.main_content}>
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default RootLayout;

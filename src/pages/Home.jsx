import { NavLink } from "react-router-dom";
import styles from "../styles/pages/Home.module.css";
import GameList from "../components/GameList";

const Home = () => {
  return (
    <>
      <section className={styles.hero}>
        <h1 className={styles.title}>Entdecke die neuesten Spiele</h1>
        <NavLink to="/games">
          <button className={styles.cta}>Jetzt einkaufen</button>
        </NavLink>
      </section>

      <section className={styles.featured}>
        <h2 className={styles.sectionTitle}>Featured Games</h2>
        <GameList maxGames={4} hideFilterIcon={true} />
      </section>

      <section className={styles.newsletter}>
        <h2 className={styles.sectionTitle}>Newsletter</h2>
        <p className={styles.newsletterText}>
          Abonniere unseren Newsletter und verpasse keine Angebote!
        </p>
        <form className={styles.newsletterForm}>
          <input
            type="email"
            placeholder="Deine E-Mail-Adresse"
            className={styles.newsletterInput}
          />
          <button type="submit" className={styles.newsletterButton}>
            Abonnieren
          </button>
        </form>
      </section>
    </>
  );
};

export default Home;

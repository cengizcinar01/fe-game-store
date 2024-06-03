import styles from "../styles/pages/Home.module.css";

const Home = () => {
  return (
    <>
      <section className={styles.hero}>
        <h1 className={styles.title}>Entdecke die neuesten Spiele</h1>
        <button className={styles.cta}>Jetzt einkaufen</button>
      </section>

      <section className={styles.featured}>
        <h2 className={styles.sectionTitle}>Featured Games</h2>
        <div className={styles.gameGrid}></div>
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

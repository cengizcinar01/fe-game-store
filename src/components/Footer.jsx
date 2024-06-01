import styles from "../styles/components/Footer.module.css";
import { FaCcPaypal, FaCcStripe, FaCcVisa, FaCcApplePay } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer_content}>
        <div className={styles.payment_icons}>
          <FaCcPaypal />
          <FaCcStripe />
          <FaCcVisa />
          <FaCcApplePay />
        </div>
        <p>&copy; 2024 Game Store. Alle Rechte vorbehalten.</p>
      </div>
    </footer>
  );
};

export default Footer;

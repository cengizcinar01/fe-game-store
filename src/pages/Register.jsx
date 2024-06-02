import { useState } from "react";
import { onRegistration } from "../api/auth";
import styles from "../styles/pages/Form.module.css";
import { NavLink } from "react-router-dom";

const Register = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await onRegistration(values);
      setError("");
      setSuccess(data.message);
      setValues({ email: "", password: "" });
    } catch (error) {
      setError(error.response.data.errors[0].msg);
      setSuccess("");
    }
  };

  return (
    <form className={styles.registerForm} onSubmit={(e) => onSubmit(e)}>
      <h1 className={styles.registerTitle}>Register</h1>

      <div className={styles.inputGroup}>
        <label className={styles.label} htmlFor="email">
          Email address
        </label>
        <input
          className={styles.input}
          onChange={(e) => onChange(e)}
          type="email"
          id="email"
          name="email"
          value={values.email}
          placeholder="example@mail.com"
          required
        />
      </div>

      <div className={styles.inputGroup}>
        <label className={styles.label} htmlFor="password">
          Password
        </label>
        <input
          className={styles.input}
          onChange={(e) => onChange(e)}
          type="password"
          value={values.password}
          id="password"
          name="password"
          placeholder="Password"
          required
        />
      </div>

      {error && <div className={styles.errorMessage}>{error}</div>}
      {success && <div className={styles.successMessage}>{success}</div>}

      <button className={styles.submitButton} type="submit">
        Submit
      </button>
      <NavLink
        to="/login"
        style={{ marginTop: "15px", textAlign: "center", display: "block" }}
      >
        Login
      </NavLink>
    </form>
  );
};

export default Register;

import { useState } from "react";
import { useDispatch } from "react-redux";
import { onLogin } from "../api/auth";
import { authenticateUser } from "../redux/slices/authSlice";
import styles from "../styles/pages/Form.module.css";
import { NavLink } from "react-router-dom";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const dispatch = useDispatch();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await onLogin(values);
      dispatch(authenticateUser());
      localStorage.setItem("isAuth", "true");
    } catch (error) {
      console.log(error.response.data.errors[0].msg);
      setError(error.response.data.errors[0].msg);
    }
  };

  return (
    <form className={styles.loginForm} onSubmit={(e) => onSubmit(e)}>
      <h1 className={styles.loginTitle}>Login</h1>

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

      <button className={styles.submitButton} type="submit">
        Submit
      </button>
      <NavLink
        to="/register"
        style={{ marginTop: "15px", textAlign: "center", display: "block" }}
      >
        Register
      </NavLink>
    </form>
  );
};

export default Login;

import { useState } from "react";

import { useDispatch } from "react-redux";

import { onLogin } from "../api/auth";

import { authenticateUser } from "../redux/slices/authSlice";

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
    <>
      <form onSubmit={(e) => onSubmit(e)}>
        <h1>Login</h1>

        <div>
          <label htmlFor="email">Email address</label>
          <input
            onChange={(e) => onChange(e)}
            type="email"
            id="email"
            name="email"
            value={values.email}
            placeholder="example@mail.com"
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            onChange={(e) => onChange(e)}
            type="password"
            value={values.password}
            id="password"
            name="password"
            placeholder="Password"
            required
          />
        </div>

        <div style={{ color: "red", margin: "10px 0" }}>{error}</div>

        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default Login;

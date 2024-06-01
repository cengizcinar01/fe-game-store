import { useState } from "react";
import { onRegistration } from "../api/auth";

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
    <>
      <form onSubmit={(e) => onSubmit(e)}>
        <h1>Register</h1>

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
        <div style={{ color: "green", margin: "10px 0" }}>{success}</div>

        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default Register;

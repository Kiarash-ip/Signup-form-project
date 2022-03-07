import React, { useState, useEffect } from "react";
import { validate } from "../validate";
import { notify } from "../toast";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./Signup.module.css";
import { Link } from "react-router-dom";

export default function Login() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    isAccepted: false,
  });

  const [errors, setErrors] = useState({});
  const [focus, setFocus] = useState({});

  useEffect(() => {
    setErrors(validate(data, "login"));
  }, [data]);

  const changeHandler = (e) => {
    if (e.target.type === "checkbox") {
      setData((prevData) => ({
        ...prevData,
        [e.target.name]: e.target.checked,
      }));
    } else {
      setData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
    }
  };

  const focusHandler = (e) => {
    setFocus((prevData) => ({ ...prevData, [e.target.name]: true }));
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (Object.keys(errors).length) {
      notify("Failed !", "error");
      setFocus({
        email: true,
        password: true,
      });
    } else {
      notify("Khoobe !", "success");
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={submitHandler} className={styles.formContainer}>
        <div className={styles.headerContainer}>
          <h2>Log in</h2>
        </div>
        <div className={styles.formField}>
          <label>Email</label>
          <input
            className={
              focus.email && errors.email
                ? styles.uncompleted
                : styles.formInput
            }
            type="text"
            name="email"
            value={data.email}
            onChange={changeHandler}
            onFocus={focusHandler}
          />
          {focus.email && errors.email && <span>{errors.email}</span>}
        </div>
        <div className={styles.formField}>
          <label>Password</label>
          <input
            className={
              focus.password && errors.password
                ? styles.uncompleted
                : styles.formInput
            }
            type="password"
            name="password"
            value={data.password}
            onChange={changeHandler}
            onFocus={focusHandler}
          />
          {focus.password && errors.password && <span>{errors.password}</span>}
        </div>
        <div className={styles.formButtons}>
          <Link to="/signup">Sign up</Link>
          <button type="submit">Login</button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

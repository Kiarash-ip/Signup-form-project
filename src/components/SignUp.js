import React, { useState, useEffect } from "react";
import { validate } from "../validate";
import { notify } from "../toast";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./Signup.module.css";
import { Link } from "react-router-dom";

export default function SignUp() {
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
    setErrors(validate(data, "signup"));
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
      notify("Ridi azizam !", "error");
      setFocus({
        name: true,
        email: true,
        password: true,
        confirmPassword: true,
        isAccepted: true,
      });
    } else {
      notify("Khoobe !", "success");
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={submitHandler} className={styles.formContainer}>
        <div className={styles.headerContainer}>
          <h2>Sign Up</h2>
        </div>
        <div className={styles.formField}>
          <label>Name</label>
          <input
            className={
              focus.name && errors.name ? styles.uncompleted : styles.formInput
            }
            type="text"
            name="name"
            value={data.name}
            onChange={changeHandler}
            onFocus={focusHandler}
          />
          {focus.name && errors.name && <span>{errors.name}</span>}
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
        <div className={styles.formField}>
          <label>Confirm Password</label>
          <input
            className={
              focus.confirmPassword && errors.confirmPassword
                ? styles.uncompleted
                : styles.formInput
            }
            type="password"
            name="confirmPassword"
            value={data.confirmPassword}
            onChange={changeHandler}
            onFocus={focusHandler}
          />
          {focus.confirmPassword && errors.confirmPassword && (
            <span>{errors.confirmPassword}</span>
          )}
        </div>
        <div className={styles.formField}>
          <div className={styles.checkboxContainer}>
            <label>i accept terms of privacy policy</label>
            <input
              type="checkbox"
              name="isAccepted"
              value={data.isAccepted}
              onChange={changeHandler}
              onFocus={focusHandler}
            />
          </div>
          {focus.isAccepted && errors.isAccepted && (
            <span>{errors.isAccepted}</span>
          )}
        </div>
        <div className={styles.formButtons}>
          <Link to="/login">Login</Link>
          <button type="submit">Sign up</button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

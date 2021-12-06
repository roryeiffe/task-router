import axios from "axios";
import React, { useState } from "react";
import "./style.css";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  function onChangeHandler(event: any) {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  }

  function onSubmitHandler(event: any) {
    event.preventDefault();
    console.log(user);
    // to do: send login data to back-end using axios
    // and grab rest of user data to store in redux
  }

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={onSubmitHandler} className = "form">
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name="email"
            placeholder='poke@mon.com'
            onChange={onChangeHandler}
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            name="password"
            placeholder='*******'
            onChange={onChangeHandler}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;

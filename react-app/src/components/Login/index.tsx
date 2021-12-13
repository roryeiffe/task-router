import axios from "axios";
import React, { useState } from "react";
import styles from './style.module.css';
import { useDispatch } from "react-redux";
import Alert from '../Alert';
import {Navigate} from 'react-router-dom';

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  // show alert upon success/failure
  const [alert, setAlert] = useState(<div></div>);

  // redirect to profile page after logging in:
  const [redirect, setRedirect] = useState(false);

  const dispatch = useDispatch();

  function onChangeHandler(event: any) {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  }

  function onSubmitHandler(event: any) {
    event.preventDefault();
    axios.post('http://localhost:9001/users/login', user)
    .then((response) => {
      console.log(response.data);
      // if reponse is empty, either the username or password is incorrect:
      if(response.data === ""){
        setAlert(<div></div>)
        setAlert(<Alert message = "Login failed, email or password incorrect" type = "danger"/>);
      }
      // if successful:
      else {
        setAlert(<div></div>)
        setAlert(<Alert message = "Login successful!" type = "success"/>);
        // update the store with the user object
        dispatch({type: 'UPDATE_USER', payload: response.data})
        // redirect to profile page:
        setRedirect(true);
      }
    })
    event.preventDefault();
    // to do: send login data to back-end using axios
    // and grab rest of user data to store in redux
  }

  return (
    <div className={styles.container}>
      {alert}
      {redirect ? <Navigate to = "/profile"/> : null}
      <form onSubmit={onSubmitHandler} className = {styles.form}>
        <h2>Login</h2>
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
        <button type="submit" className={`btn btn-primary ${styles.btnSubmit}`}>
          Login
        </button>
        <br />
      </form>
      
    </div>
  );
};

export default Login;

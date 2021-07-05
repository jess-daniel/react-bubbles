import React, { useState } from "react";
import axios from "axios";

const Login = props => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [values, setValues] = useState({
    credentials: {
      username: "",
      password: ""
    },
    isLoggedIn: false
  });

  const handleChanges = e => {
    setValues({
      credentials: { ...values.credentials, [e.target.name]: e.target.value }
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/login", values.credentials)
      .then(res => {
        console.log(res);
        const { data } = res;

        localStorage.setItem("token", data.payload);
        setValues({ ...values, isLoggedIn: true });
        props.history.push("/bubbles-page");
      })
      .catch(err => console.log(err.response));
  };

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <p>Build a login page here</p>
      <form onSubmit={handleSubmit}>
        <label>
          {" "}
          Username
          <input
            type="text"
            name="username"
            value={values.credentials.username}
            onChange={handleChanges}
          />
        </label>
        <label>
          {" "}
          Password
          <input
            type="password"
            name="password"
            value={values.credentials.password}
            onChange={handleChanges}
          />
        </label>
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default Login;

import React, { useState, useContext } from 'react';
import { FaFacebook } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

import { UserContext } from '../../context/userContext';

import "../Login/Login.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");

  const { setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/api/auth/login", {
        email,
        password
      });
      setUser(response.data)
      if (response.statusText === "OK") {
        navigate("/");
      }

    } catch (error) {
      // console.log(error.response.data.errors)
      setErrors(error.response.data.errors);
    }
  }
  return (
    <section className="login" onSubmit={handleLogin}>
      <div className="form--container">
      <h1 className="heading">login</h1>
      <h3 className="text">Welcome to airStaar</h3>
      <form action="" className="form">
        <div className="form--box">
            <input
              type="email"
              name="useremail"
              id="useremail"
              placeholder='enter your email...'
              value={email}
              onChange={(event) => {
                if (errors.email) {
                  errors.email = "";
                }
                setEmail(event.target.value)
              }}
            />
        </div>
        {errors && (<p className="error">{errors.email}</p>)}
        <div className="form--box">
            <input
              type="text"
              name="password"
              id="password"
              placeholder='provide your pasword...'
              value={password}
              onChange={(event) => {
                if (errors.password) {
                  errors.password = "";
                }
                setPassword(event.target.value)
              }}
            />
        </div>
        {errors && (<p className="error">{errors.password}</p>)}
        <button type="submit">login</button>
      </form>
      <p className="text">or</p>
      <div className="social-login-box">
        <FaFacebook />
        <p className="text">continue with facebook</p>
      </div>
      <div className="account">
        <p>Don't have an account? <Link to={"/register"}>Sign Up</Link></p>
      </div>
      </div>
    </section>
  )
}

export default Login
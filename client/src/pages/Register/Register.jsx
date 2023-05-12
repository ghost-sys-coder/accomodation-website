import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { UserContext } from "../../context/userContext";


import "../Register/Register.scss";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");

  const { setUser } = useContext(UserContext)
 
  const navigate = useNavigate();

  
  const registerUser = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/api/auth/register", {
        username,
        email,
        password
      });
      setUser(response.data);
      if (response.statusText === "OK") {
        navigate("/");
      }
      console.log(response)
    } catch (error) {
      setErrors(error.response.data.errors)
    } 
  }

  console.log(errors)

  return (
    <section className="register" onSubmit={registerUser}>
      <div className="form--container">
      <h1 className="heading">register</h1>
      <h3 className="text">Welcome to airStaar</h3>
      <form action="" className="form">
        <div className="form--box">
          <input 
          type="text" 
          name='username' 
          placeholder='enter your name...'
          value={username}
          onChange={(event) => {
            if (errors.username) {
              errors.username = ""
            }
            setUsername(event.target.value)
          }}
          />
        </div>
          {errors && (<p className="error">{errors.username}</p>)}
        <div className="form--box">
            <input
              type="email"
              name="useremail"
              id="useremail"
              placeholder='enter your email...'
              value={email}
              onChange={event => {
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
              onChange={event => setPassword(event.target.value)}
            />
        </div>
        <button type="submit">sign up</button>
      </form>

      <div className="account">
        <p>Already have an account? <Link to={"/login"}>login</Link></p>
      </div>
      </div>
    </section>
  )
}

export default Register
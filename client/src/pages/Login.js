import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../context/authContext";

function Login() {
  const [inputs, setInputs] = useState({
    username: "",
    passsword: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate("/");
  const { login } = useContext(AuthContext);

  // Functions
  const handleInputChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(inputs);
      navigate("/");
    } catch (err) {
      setError(err.response.data);
    }
  };
  return (
    <Auth>
      <h1>Log in</h1>
      <form onSubmit={handleLoginSubmit}>
        <input
          required
          onChange={handleInputChange}
          name="username"
          placeholder="Username"
        />
        <input
          required
          onChange={handleInputChange}
          name="password"
          placeholder="Password"
          type="password"
        />
        <button>Login</button>
        <p>{error && error}</p>
        <span>
          Don't have an account? <br /> <Link to="/register">Sign up</Link>
        </span>
      </form>
    </Auth>
  );
}

export default Login;

const Auth = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: var(--lightGreen);

  h1 {
    font-size: 20px;
    color: teal;
    margin-bottom: 20px;
  }

  form {
    display: flex;
    flex-direction: column;
    padding: 50px;
    border-radius: 10px;
    background-color: white;
    gap: 20px;
    width: 200px;

    input {
      border: none;
      border-bottom: 1px solid gray;
      padding: 10px;
    }

    button {
      padding: 10px;
      color: white;
      background-color: teal;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }

    p {
      font-size: 12px;
      color: red;
      text-align: center;
    }

    span {
      font-size: 14px;
      text-align: center;
    }
  }
`;

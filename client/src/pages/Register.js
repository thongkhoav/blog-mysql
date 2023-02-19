import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

function Register() {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Functions
  const handleInputChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/auth/register", inputs);
      navigate("/login");
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <Auth>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          required
          onChange={handleInputChange}
          placeholder="Username"
          name="username"
        />
        <input
          required
          onChange={handleInputChange}
          placeholder="Email"
          type="email"
          name="email"
        />
        <input
          required
          onChange={handleInputChange}
          placeholder="Password"
          type="password"
          name="password"
        />
        <button>Register</button>
        <p>{error && error}</p>
        <span>
          Already have an account! <br /> <Link to="/login">Login</Link>
        </span>
      </form>
    </Auth>
  );
}

export default Register;

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

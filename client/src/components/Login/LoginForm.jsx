import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../../actions/userActions';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3030/authentication", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          strategy: 'local',
          email: formData.email,
          password: formData.password,
        })
      });

      if (!response.ok) {
        if (response.status === 401) {
          setErrors(prevErrors => [...prevErrors, "Invalid email or password"]);
          return;
        } else {
          setErrors(prevErrors => [...prevErrors, "Error during authentication"]);
          return;
        }
      }

      setErrors([]);

      const data = await response.json();

      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('user', JSON.stringify(data.user));

      dispatch(setUser(data.user));

      console.log('User authenticated:', data.user);
      navigate('/');

    } catch (error) {
      console.error('Error during authentication:', error);
    }
  };
  return (
    <>
      <style>
        {`
          body {
    font-family: Arial, sans-serif;
    background-color: #f4f4f4;
  }
    form {
    padding: 5rem;
    }
  h2 {
    text-align: center;
    margin-bottom: 20px;
  }
  .radio-group {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }
  .radio-group label {
    margin: 0 10px;
  }
  form div {
    margin-bottom: 15px;
  }
  form label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }
  input[type="email"],
  input[type="password"],
  input[type="text"],
  textarea {
    width: 100%;
    padding: 8px;
    margin-top: 5px;
    border: 1px solid #ccc;
    border-radius: 3px;
    box-sizing: border-box;
  }
  textarea {
    height: 100px;
  }
  button {
    display: block;
    width: 100%;
    padding: 10px;
    margin-top: 20px;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    background-color: #213547;
    color: white;
    font-size: 16px;
  }
  button:hover {
    background-color: #0056b3;
  }
        `}
      </style>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <button type="submit">Login</button>
        {errors && errors.length > 0 && errors.map((error, index) => <p key={index}>{error}</p>)}
      </form>
    </>
  );
}

export default LoginForm;
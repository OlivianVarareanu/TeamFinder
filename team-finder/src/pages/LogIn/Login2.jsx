import React, { useState } from 'react';
import axios from 'axios';

const Login2 = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://teamfinderapp.azurewebsites.net/auth/signin', credentials);
      const { accessToken, refreshToken } = response.data.data;
      console.log(response.data);
      // Store the tokens in localStorage or secure cookie for later use
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
  
      // Redirect or perform other actions upon successful login
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        value={credentials.email}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        value={credentials.password}
        onChange={handleChange}
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login2;

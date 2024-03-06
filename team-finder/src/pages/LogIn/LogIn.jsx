import React, { useState } from 'react';
import axios from 'axios';
import { Link,Navigate} from 'react-router-dom';
import Logo from '/src/assets/Logo.png';
import InterLink from '/src/assets/ONKVWY0 copy.png';
import Envelope from '/src/assets/envelope-solid (1).svg';
import Lock from '/src/assets/lock-solid (1).svg';
import './LogIn.css';

const LogIn = () => {

  const [isAuth, setIsAuth] = useState(false);
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


      if (accessToken) {
        setIsAuth(true);
       
       
      }

      else
      {
        alert("Wrong email or password");
      }
      // Redirect sau efectuează alte acțiuni după autentificarea reușită
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className='wrapper'>
        <img src={InterLink} alt="InterLink" className="InterLink" />
        <form className='InputContent' onSubmit={handleSubmit}>
          <img src={Logo} alt="Logo" className="logo" />
          <img src={Envelope} alt="Envelope" className="Envelope" />
          <input className='Email' type="email" name="email" value={credentials.email} onChange={handleChange} placeholder='Email' maxLength={35} required />
          <img src={Lock} alt="Lock" className="Lock" />
          <input className='Password' type="password" name="password" value={credentials.password} onChange={handleChange} placeholder='Password' maxLength={35} required />

          {isAuth ? 
            <Navigate to="/projects" />
           : (
            <button className='LogInBtn' type="submit">Log In</button>
          )
           }
           

          <Link to={"/signup"} className="createAccount">
            <p>Create your account</p>
          </Link>
        </form>
      </div>
    </>
  );
};

export default LogIn;
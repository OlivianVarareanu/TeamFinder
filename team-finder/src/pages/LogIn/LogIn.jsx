import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '/src/assets/Logo.png';
import InterLink from '/src/assets/ONKVWY0 copy.png';
import Envelope from '/src/assets/envelope-solid (1).svg'
import Lock from '/src/assets/lock-solid (1).svg'
import './LogIn.css';


const LogIn = () => {  

  return (

    <div className='wrapper'>
      <img src={InterLink} alt="InterLink" className="InterLink" />
      <div className='InputContent'>
        <img src={Logo} alt="Logo" className="logo" />
        <img src={Envelope} alt="Envelope" className="Envelope" />
        <input className='Email' type='text' placeholder='Email'maxLength={35} required />
        <img src={Lock} alt="Lock" className="Lock" />
        <input className='Password' type='password' placeholder='Password' maxLength={35} required />
        <button className='LogInBtn'>Log In</button>
        <Link to="/projects" className="createAccount" >Create your account</Link>
      </div>
    </div>
  );
};

export default LogIn;

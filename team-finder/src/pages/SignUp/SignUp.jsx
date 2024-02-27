import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '/src/assets/team-icon.png'
import './SignUp.css';

const SignUp = () => {
  return (
    <div className='wrapper'>
      <img src={InterLink} alt="InterLink" className="InterLink" />
      <div className='InputContent'>
        <img src={Logo} alt="Logo" className="logo" />
        <input className='Email' type='text' placeholder='Email' required />
        <input className='Password' type='password' placeholder='Password' required />
        <button className='LogInBtn'>SignUp</button>
        <Link to="/login" className="createAccount">Already SignedUp?</Link>
      </div>
    </div>
  );
};

export default SignUp;

import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '/src/assets/team-icon.png'
import "./SignUp.css"

export default function SignUp (){
  return (
    <div className='wrapper'>
      <div className='lef-container'>
      <img src="/src/assets/ONKVWY0 copy.png" alt="" className='image-logo'/>
      </div>

      
      <div className='InputContent'>
        <img src={Logo} alt="Logo" className="logo" />
        <input className='Email' type='text' placeholder='Email' required />
        <input className='Password' type='password' placeholder='Password' required />
        <button className='LogInBtn'>Sign Up</button>
        <Link to="/login" className="createAccount">Already Signed up?</Link>
      </div>
    </div>
    
  );
};


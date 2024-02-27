<<<<<<< HEAD
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '/src/assets/Logo.png';
import InterLink from '/src/assets/ONKVWY0 copy.png';
import "./SignUp.css"

export default function SignUp (){
  const [showAdminInputs, setShowAdminInputs] = useState(false);
  const [showEmployeeInputs, setShowEmployeeInputs] = useState(false);
  const [showBackLink, setShowBackLink] = useState(false);

  const handleAdminSignUp = () => {
    setShowAdminInputs(true);
    setShowEmployeeInputs(false);
    setShowBackLink(true);
  };

  const handleEmployeeSignUp = () => {
    setShowEmployeeInputs(true);
    setShowAdminInputs(false);
    setShowBackLink(true);
  };

  const handleBack = () => {
    setShowAdminInputs(false);
    setShowEmployeeInputs(false);
    setShowBackLink(false);
  };

  return (
    <div className='wrapper'>
      <img src={InterLink} alt="InterLink" className="InterLink" />
      
      <div className='InputContent'>
        <img src={Logo} alt="Logo" className="logoSignUp" />
        {!showAdminInputs && !showEmployeeInputs && (
          <div className='SignUpbuttons'>
            <button className='SignUpAdministratorBtn' onClick={handleAdminSignUp}>SignUp as Administrator</button>
            <button className='SignUpEmployeeBtn' onClick={handleEmployeeSignUp}>SignUp as Employee</button>
          </div>
        )}
        {(showAdminInputs || showEmployeeInputs) && (
          <>
            {showEmployeeInputs && (
              <>
                <input className='NameSignUp' type='text' placeholder='Name' required />
                <input className='EmailSignUp' type='text' placeholder='Email' required />
                <input className='PasswordSignUp' type='password' placeholder='Password' required />
              </>
            )}
            {showAdminInputs && (
              <>
                <input className='NameSignUp' type='text' placeholder='Name' required />
                <input className='EmailSignUp' type='text' placeholder='Email' required />
                <input className='PasswordSignUp' type='password' placeholder='Password' required />
                <input className='PasswordSignUp' type='text' placeholder='Organization Name' required />
                <input className='PasswordSignUp' type='text' placeholder='Headquarter Address' required />
              </>
            )}
            <button className='LogInBtnSignUp'>Sign Up</button>
            {showBackLink && (
              <Link className='back' onClick={handleBack}>Back</Link>
            )}
          </>
        )}
        <Link to="/login" className="createAccount">Already Signed up?</Link>
      </div>
    </div>  
  );
};
=======
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
>>>>>>> 166eceb (resolved navbar)

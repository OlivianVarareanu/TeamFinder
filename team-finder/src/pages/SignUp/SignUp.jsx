import React, { useEffect, useState } from 'react';
import { Link,Navigate } from 'react-router-dom';
import Logo from '/src/assets/Logo.png';
import InterLink from '/src/assets/ONKVWY0 copy.png';
import "./SignUp.css"


export default function SignUp() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [hq_address, setHq_address] = useState("");
  const [isAuthorised,setIsAuthorised] = useState(false);

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

   
 

  const signUpEmployee = async () => {
    const invitationToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbnZpdGVySWQiOiI2NWUzNWYxNWEzN2FkODQzYWFhNGFiNjgiLCJvcmdhbml6YXRpb25JZCI6IjY1ZTM1ZjE1YTM3YWQ4NDNhYWE0YWI2NiIsImlhdCI6MTcwOTU3NDc1NCwiZXhwIjoxNzEwMTc5NTU0fQ.QAd6ScHo8fgpud_fp73oiosO0SNByKJLzzncyekZpvA";
    const item = { invitationToken, name, email, password };
    console.warn(item);
    const result = await fetch('api/auth', {
      method: 'POST',
      body: JSON.stringify(item),
      headers: {
        "Content-Type": 'application/json',
        "Accept": 'application/json',
      }
    });

    const data = await result.json();
    
    console.warn("data",data);
  };

  

  const signUpAdministrator = async () => {
    // const invitationToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbnZpdGVySWQiOiI2NWUzNWYxNWEzN2FkODQzYWFhNGFiNjgiLCJvcmdhbml6YXRpb25JZCI6IjY1ZTM1ZjE1YTM3YWQ4NDNhYWE0YWI2NiIsImlhdCI6MTcwOTU3NDc1NCwiZXhwIjoxNzEwMTc5NTU0fQ.QAd6ScHo8fgpud_fp73oiosO0SNByKJLzzncyekZpvA";
    const item = { name, email, password, hq_address,organizationName };
    console.warn("item",item);
    const result = await fetch('api/auth/admin', {
      method: 'POST',
      body: JSON.stringify(item),
      headers: {
        "Content-Type": 'application/json', 
        "Accept": 'application/json',
      }
    });
    const data = await result.json();

    
    console.warn("result", data);
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
                <input onChange={(e) => setName(e.target.value)}
                  className='NameSignUp'
                  type='text'
                  placeholder='Name'
                  required
                  value={name}
                />
                <input onChange={(e) => setEmail(e.target.value)}
                  className='EmailSignUp'
                  type='text'
                  placeholder='Email'
                  required
                  value={email}
                />
                <input onChange={(e) => setPassword(e.target.value)}
                  className='PasswordSignUp'
                  type='password'
                  placeholder='Password'
                  required
                  value={password}
                />
              </>
            )}
            {showAdminInputs && (
              <>
                <input onChange={(e) => setName(e.target.value)}
                  className='NameSignUp'
                  type='text'
                  placeholder='Name'
                  required
                  value={name}
                />
                <input onChange={(e) => setEmail(e.target.value)}
                  className='EmailSignUp'
                  type='text'
                  placeholder='Email'
                  required
                  value={email}
                />
                <input onChange={(e) => setPassword(e.target.value)}
                  className='PasswordSignUp'
                  type='password'
                  placeholder='Password'
                  required
                  value={password}
                />
                <input onChange={(e) => setOrganizationName(e.target.value)}
                  className='NameSignUp'
                  type='text'
                  placeholder='Organization Name'
                  required
                  value={organizationName}
                />
                <input onChange={(e) => setHq_address(e.target.value)}
                  className='NameSignUp'
                  type='text'
                  placeholder='Headquarter Address'
                  required
                  value={hq_address}
                />
              </>
            )}

            {isAuthorised?
            <Navigate to="/login"/>:""}
            {showAdminInputs && (
              <button onClick={signUpAdministrator} className='LogInBtnSignUp'>Sign Up as Administrator</button>
            )} 
            {showEmployeeInputs && (
              <button onClick={signUpEmployee} className='LogInBtnSignUp'>Sign Up as Employee</button>
            )}
            
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

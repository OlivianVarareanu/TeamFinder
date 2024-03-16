import React, { useEffect, useState,useRef } from 'react';
import {useNavigate, Navigate, useLocation, Link } from 'react-router-dom';
import Logo from '/src/assets/Logo.png';
import InterLink from '/src/assets/ONKVWY0 copy.png';
import "./SignUp.css";
import api from '../../api/api';
import CircularIndeterminate from '../../auth-logic/loading';
import axios from 'axios';

export default function SignUp() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isValidToken, setIsValidToken] = useState(null);
  const [organizationName, setOrganizationName] = useState("");
  const [hq_address, setHq_address] = useState("");
  const companyName = useRef ("");


  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const invitationToken = urlParams.get('token');


  let navigate = useNavigate();
  const[auth,setAuth]=useState(null);


    useEffect(()=> {
        const fetchProfile = async () => {
            try {
                const response = await api.get('api/user/me',{withCredentials:true});
                if(response.status===200)
                {
                    setAuth(true);
                }
                else {
                    setAuth(false);
                }
               
            }
            catch(error){
                console.log('se incarca info');
                
            }
            }
            fetchProfile();
        },[]);





  useEffect(() => {
    const validateToken = async () => {
      if (invitationToken) {
        try {
          const response = await axios.get(`/api/token/validate/${invitationToken}`);
          if (response.data.success) {
            setIsValidToken(true);

            
            
            console.log('e valiid');

            console.log(response);
         
            companyName.current=response.data.details.organizationId.name;
            
            console.log(companyName.current);

          } else {
            setIsValidToken(false);
          }
        } catch (error) {
          console.error('Token validation error:', error);
          setIsValidToken(false);
        }
      }
      setIsLoading(false);

    };

    
    validateToken();
  }, [invitationToken]);


  

  const signUpEmployee = async () => {
    
    const result = await axios.post('/api/auth',{ name, email, password, invitationToken });
    
    if (result.status===200) {
      
      console.log('Registration successful');
      navigate('/login');
    } else {
      console.error('Registration failed');
    }
  };


  if (isLoading) {
    return <CircularIndeterminate />;
  }



  if (isValidToken==='error') {
    console.log('token error')
    return <Navigate to="/login" />;
  }

  const signUpAdministrator = async () => {
    
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


    if (result.status===200) {
      // Handle successful registration
      console.log('Registration successful');
      navigate('/login');
    } else {
      console.error('Registration failed');
    }

    
    console.warn("result", data);
  };

  console.log('isauth',auth);

  if(!auth)
  {
    return(

    isValidToken ? 
      <div className='wrapper'>
        <img src={InterLink} alt="InterLink" className="InterLink" />
        <div className='InputContent'>
          <img src={Logo} alt="Logo" className="logoSignUp" />
          <p className='employment-message'>EMPLOYMENT INVITATION FROM</p> 

          <h1 className='company-name'>{companyName.current.toUpperCase()}</h1>
          <input onChange={(e) => setName(e.target.value)} className='NameSignUp' type='text' placeholder='Name' required value={name} />
          <input onChange={(e) => setEmail(e.target.value)} className='EmailSignUp' type='text' placeholder='Email' required value={email} />
          <input onChange={(e) => setPassword(e.target.value)} className='PasswordSignUp' type='password' placeholder='Password' required value={password} />
          <button onClick={signUpEmployee} className='LogInBtnSignUp'>Sign Up</button>
          <Link to="/login" className="createAccount">Already Signed up?</Link>
        </div>
      </div>

    :

      <div className='wrapper'>
        <img src={InterLink} alt="InterLink" className="InterLink" />

        <div className='InputContent'>
          <img src={Logo} alt="Logo" className="logoSignUp" />

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


        
        
            <button onClick={signUpAdministrator} className='LogInBtnSignUp'>Sign Up as Employee</button>
      
        
        
            <Link className='back'to={"/login"} >Back</Link>
        

        </div>
      </div>
      
      
        
  

  )
  } else {
    navigate("/projects");
  } 

}

  

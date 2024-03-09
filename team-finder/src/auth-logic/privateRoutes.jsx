import { useEffect, useState } from 'react'
import { Outlet, Navigate, useNavigate } from 'react-router-dom'
import api from '../api/api';



export const PrivateRoutes = ({children}) => {
    const[isAuthenticated,setIsAuthenticated]=useState(null);
    const[isLoading,setIsLoading]=useState(true);
    
    const navigate= useNavigate();
    useEffect( ()=> {

        
        const checkPermissions = async () => {
            try{
                const response = await api.get('api/user/me');
                console.log(response);

                if(response.status === 200){
                    console.log(response);
                    setIsAuthenticated(true);
                } else {
                    navigate('/login');
                    setIsAuthenticated(false);
                }
            } catch(error) {
                setIsAuthenticated(false);
                console.log(error)
            }
         setIsLoading(false);
        };

        checkPermissions();
    },[navigate]);

    if(isLoading){
        return <div>-Loading-</div>
    }

    return isAuthenticated? <Outlet/> : <Navigate to="/login" />
};



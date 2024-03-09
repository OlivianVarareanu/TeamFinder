import { useEffect, useState } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import api from '../api/api';


export const PrivateRoutes = ({children}) => {
    const[isAuthenticated,setIsAuthenticated]=useState(true);
    const[isLoading,setIsLoading]=useState(true);
    console.log('test');

    useEffect( ()=> {

        console.log('test2');
        const checkPermissions = async () => {
            try{
                const response = await api.get('api/user/me');
                console.log(response);

                if(response.status === 200){
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            } catch(error) {
                setIsAuthenticated(false);
                console.log(error)
            }
         setIsLoading(false);
        };

        checkPermissions();
    },[]);

    if(isLoading){
        return <div>-Loading-</div>
    }

    return isAuthenticated? <Outlet/> : <Navigate to="/login" />
};



import { useState,useEffect } from "react";
import api from "../api/api";
import CircularIndeterminate from "../auth-logic/loading";

export default function fetch_access() {

    const[auth,setAuth]=useState(false);

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

        if(!auth){
            return CircularIndeterminate();
        }

}


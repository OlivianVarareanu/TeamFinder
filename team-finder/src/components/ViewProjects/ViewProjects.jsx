import api from "../../api/api";
import CircularIndeterminate from "../../auth-logic/loading";
import apiURL from "../../../apiURL";
import { useState,useEffect } from "react";

export default function ViewProjects () {

    const[auth,setAuth]=useState(false);
    const[roles,setRoles]=useState([]);

    useEffect(()=> {
        const fetchProfile = async () => {
            try {
                const response = await api.get(`${apiURL}/user/me`,{withCredentials:true});
                if(response.status===200)
                {
                    setAuth(true);
                    setRoles(response.data.user.roles);
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

    return ( 
        roles.includes(1)||roles.includes(3)&&
        <div>
            
        </div>
    )
}
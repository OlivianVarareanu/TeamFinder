import { useState,useEffect } from "react";
import api from "../../api/api";
import CircularIndeterminate from "../../auth-logic/loading";
import apiURL from "../../../apiURL";


export default function Notifications(){

    const[user,setUser]=useState(null);

    
    useEffect(()=> {
        const fetchProfile = async () => {
            try {
                const response = await api.get(`${apiURL}/user/me`,{withCredentials:true});
                setUser(response.data);
               
            }
            catch(error){
                console.log('se incarca info');
            }
            }
            fetchProfile();
        },[]);

        if(!user){
            return CircularIndeterminate();
        }
        else

    return(<>

    <div>
    <p>Notifications</p>
    </div>
    </>) 
    
}
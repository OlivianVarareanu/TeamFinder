import Navbar from "../../components/Navbar/Navbar";
import "./profile.css"
import api from "../../api/api";
import { useEffect, useState } from "react";

export default function Profile(){

    const[user,setUser]=useState(null);

    
    useEffect(()=> {
        const fetchProfile = async () => {
            try {
                const response = await api.get('api/user/me',{withCredentials:true});
                setUser(response.data);
               
            }
            catch(error){
                console.log('se incarca info');
            }
            }
            fetchProfile();
        },[]);

        if(!user){
            return <div>Loading...</div>;
        }

    return(<>
        

    <div className="wrapper">
    <p className = "profi">Profile</p>
    </div>
    </>)
}
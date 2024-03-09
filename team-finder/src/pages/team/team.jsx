import Navbar from "../../components/Navbar/Navbar";
import { useState,useEffect } from "react";
import api from "../../api/api";


export default function Team(){

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
    <div>
    <p>Team</p>
    </div>
    </>
    )
}
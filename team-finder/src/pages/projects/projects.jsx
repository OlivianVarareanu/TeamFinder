import Navbar from "../../components/Navbar/Navbar";
import CreateProject from "../../components/CreateProject/CreateProject";
import "./projects.css"
import { useState,useEffect } from "react";
import api from "../../api/api";
import CircularIndeterminate from "../../auth-logic/loading";


export default function Projects(){

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
            return CircularIndeterminate();
        }
    
    return(<>
    <CreateProject/> 
    </>
    
    )
}
import axios from "axios";
import { useEffect, useState } from "react";
import CircularIndeterminate from "../../auth-logic/loading";
import api from "../../api/api";
import "./InviteLinkGenerator.css";

export default function InviteLinkGenerator() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await api.post('/api/admin/invitation',{withCredentials:true});
                setUser(response.data);   
            } catch(error){
                console.log(error);
            }
        }
        fetchProfile();
    }, []);

    const handleClick = () => {
        if (user) {
            const token = user.inviteToken.token;
            const currentUrl = window.location.href;
            const updatedUrl = `${currentUrl.substring(0, currentUrl.length - 4)}signup?token=${token}`;
            const display = document.getElementById('display');
            
            if (display) {
                display.innerText = updatedUrl;
            }
            
        }
    }

    console.log(user);

    if (!user) {
        return <CircularIndeterminate />;
    }


    return (
        <>
            <button onClick={handleClick}>Generate Link Invitation</button>
            <p className="display" id="display"></p>
        </>
    );
}

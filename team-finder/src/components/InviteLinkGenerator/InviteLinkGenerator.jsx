import axios from "axios";
import { useEffect, useState } from "react";
import CircularIndeterminate from "../../auth-logic/loading";
import api from "../../api/api";
import "./InviteLinkGenerator.css";
import apiURL from "../../../apiURL";

export default function InviteLinkGenerator() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await api.post(`${apiURL}/admin/invitation`, { withCredentials: true });
                setUser(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchProfile();
    }, []);

    const handleClick = () => {
        if (user) {
            const token = user.inviteToken.token;
            const currentUrl = window.location.href;
            const updatedUrl = `${currentUrl.substring(0, currentUrl.length - 4)}signup?token=${token}`;
            
            // Copiază link-ul în clipboard
            navigator.clipboard.writeText(updatedUrl)
                .then(() => {
                    alert("Invitation link has been copied successfully to clipboard.");
                })
                .catch((error) => {
                    console.error("An error occurred while copying the link to clipboard. Please try again.", error);
                });
        }
    };

    if (!user) {
        return <CircularIndeterminate />;
    }

    return (
        <>
            <button className="generate-button" onClick={handleClick}>Generate Link Invitation</button>
        </>
    );
}

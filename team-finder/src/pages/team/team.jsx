import api from "../../api/api";
import InviteLinkGenerator from "../../components/InviteLinkGenerator/InviteLinkGenerator";
import TeamTable from "../../components/TeamTable/TeamTable";
import { useState,useEffect } from "react";
import CircularIndeterminate from "../../auth-logic/loading";
import TeamRoles from "../../components/TeamRoles/TeamRoles";
import "./team.css";
import apiURL from "../../../apiURL";

export default function Team() {

    const [auth, setAuth] = useState(null);
    const [roles,setRoles] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                // Obține informațiile despre utilizatorul actual
                const response = await api.get(`${apiURL}/user/me`, { withCredentials: true });
                if(response.status===200)
                {
                    setAuth(true);
                    console.log('rezultatul fetchului=',response);
                    setRoles(response.data.user.roles);
                    console.log('roluri user=',roles);

                }

            } catch (error) {
                console.log(error);
            }
        };

        fetchProfile();
    }, []);

    if (!auth) {
        return CircularIndeterminate();
    }

    return(

        <>
        <TeamTable/>
        <div className="section-divider">
            <TeamRoles/>

            {roles.includes(1)&&<div className="link-generator">
                <div>
                    <h1>Invite people to join this organisation</h1>
                </div>

                <div>
                <InviteLinkGenerator/>
                </div>

            </div>}
        </div>
        </>
    )

}

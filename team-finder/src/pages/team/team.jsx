import api from "../../api/api";
import InviteLinkGenerator from "../../components/InviteLinkGenerator/InviteLinkGenerator";
import TeamTable from "../../components/TeamTable/TeamTable";
import { useState,useEffect } from "react";
import CircularIndeterminate from "../../auth-logic/loading";

export default function Team() {

    const [user, setUser] = useState(null);
    

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                // Obține informațiile despre utilizatorul actual
                const responseUser = await api.get('api/user/me', { withCredentials: true });
                setUser(responseUser.data);


                // Obține lista de utilizatori ai organizației
                const responseOrganizationUsers = await api.get('api/organization/users', { withCredentials: true });
                setOrganizationUsers(responseOrganizationUsers.data.users);
                console.log(responseOrganizationUsers.data.users);

                
            } catch (error) {
                console.log(error);
            }
        };

        fetchProfile();
    }, []);

    if (!user) {
        return CircularIndeterminate();
    }

    const temp = localStorage.getItem('user');
    
    const temp2 = JSON.parse(temp);

    const roles = temp2.roles;

    console.log('roluri ',roles);


    return(

        <>
        <TeamTable/>
        <div>
        
        {roles.includes(1)?
        <InviteLinkGenerator/>
        :""
                }
        </div>
        </>
    )

}

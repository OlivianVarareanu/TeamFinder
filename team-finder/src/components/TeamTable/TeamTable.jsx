import { useState, useEffect } from "react";
import api from "../../api/api";
import CircularIndeterminate from "../../auth-logic/loading";


export default function () {

    const [user, setUser] = useState(null);
    const [organizationUsers, setOrganizationUsers] = useState([]);

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

    return (
        <>
            <div className="wrapper-table">

                {/* Verifică dacă organizationUsers este un array înainte de a apela map() */}
                {Array.isArray(organizationUsers) && organizationUsers.length > 0 ? (
                    <table className="users-table">
                        <th>Name</th>
                        <th>Email</th>
                        <th>Available Hours</th>
                        <tbody>
                        {organizationUsers.map((orgUser) => (
                            <tr key={orgUser.id}>
                                <td>{orgUser.name} </td>
                                <td>{orgUser.email}</td> 
                                <td>{orgUser.availableHours}</td>
                            </tr>
                            
                        ))}
                        </tbody>
                    </table>
                ) : (
                    CircularIndeterminate()
                )}
            </div>
        </>
    );

}


import { useState, useEffect } from "react";
import axios from "axios";
import api from "../../api/api";
import CircularIndeterminate from "../../auth-logic/loading";
import "./TeamTable.css";

export default function () {
    const [user, setUser] = useState(null);
    const [organizationUsers, setOrganizationUsers] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [roles, setRoles] = useState([]);
    const [modifiedUsers, setModifiedUsers] = useState([]);
    const [shouldRerender, setShouldRerender] = useState(false); // Noua stare pentru a forța re-render

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const responseUser = await api.get('api/user/me', { withCredentials: true });
                setUser(responseUser.data);
                setRoles(responseUser.data.user.roles);

                const responseOrganizationUsers = await fetchOrganizationUsers(currentPage);
                setOrganizationUsers(responseOrganizationUsers.users);
                setTotalPages(responseOrganizationUsers.pagination.totalPages);
            } catch (error) {
                console.log(error);
            }
        };

        fetchProfile();
    }, [currentPage, shouldRerender]); // Adăugați shouldRerender în array-ul de dependențe

    const fetchOrganizationUsers = async (page) => {
        const response = await api.get(`api/organization/users?page=${page}`, { withCredentials: true });
        return response.data;
    };

    const mapRoles = (roleNumber) => {
        switch (roleNumber) {
            case 1:
                return "Admin";
            case 2:
                return "Department Manager";
            case 3:
                return "Project Manager";
            case 4:
                return "Employee";
            default:
                return "Unknown";
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const changeUserRole = async (userId, newRole) => {

        try {
            const updatedUsers = organizationUsers.map(user => {
              
                if (user._id === userId) {
                    return { ...user, roles: newRole };
                }
                return user;
            });
            setOrganizationUsers(updatedUsers);

            const modifiedUserIndex = modifiedUsers.findIndex(user => user.id === userId);
            if (modifiedUserIndex === -1) {
                setModifiedUsers([...modifiedUsers, { id: userId, roles: newRole }]);
            } else {
                const updatedModifiedUsers = [...modifiedUsers];
                updatedModifiedUsers[modifiedUserIndex] = { id: userId, roles: newRole };
                setModifiedUsers(updatedModifiedUsers);
            }
        } catch (error) {
            console.log('error', error);
        }
    };

    const handleSaveChanges = async () => {
        try {
            await Promise.all(modifiedUsers.map(async modifiedUser => {
                await axios.put(
                    "https://teamfinderapp.azurewebsites.net/api/admin/set-role",
                    { userId: modifiedUser.id, role: parseInt(modifiedUser.roles) },
                    { withCredentials: true }
                );
            }));
            // Resetează lista de utilizatori modificați după salvare
            setModifiedUsers([]);
            // Setează shouldRerender la valoarea opusă pentru a forța re-render
            setShouldRerender(prevState => !prevState);
        } catch (error) {
            console.log('error', error);
        }
    };

    if (!user) {
        return <CircularIndeterminate />;
    }

    return (
        <>
            <div className="wrapper-table">
                {Array.isArray(organizationUsers) && organizationUsers.length > 0 ? (
                    <>
                        <table className="users-table">
                            <thead>
                                <tr>
                                    <th>NAME</th>
                                    <th>EMAIL</th>
                                    <th>AVAILABLE HOURS</th>
                                    {roles.includes(1) && <th>ROLES</th>}
                                </tr>
                            </thead>
                            <tbody>
                                {organizationUsers.map((orgUser) => (
                                    <tr key={orgUser.email}>
                                        <td>{orgUser.name}</td>
                                        <td>{orgUser.email}</td>
                                        <td>{orgUser.availableHours}</td>
                                        {roles.includes(1) && (
                                            <td>
                                                {Array.isArray(orgUser.roles) ? (
                                                    orgUser.roles.map((role) => (
                                                        <span key={role}>{mapRoles(role)}<br/></span>
                                                    ))
                                                ) : (
                                                    <span>{mapRoles(orgUser.roles)}</span>
                                                )}
                                                {roles.includes(1) && (
                                                    <select onChange={(e) => changeUserRole(orgUser._id, parseInt(e.target.value))}>
                                                        <option value="">Select Role</option>
                                                        <option value="1">Admin</option>
                                                        <option value="2">Department Manager</option>
                                                        <option value="3">Project Manager</option>
                                                        <option value="4">Employee</option>
                                                    </select>
                                                )}
                                            </td>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="buttons-wrapper">
                            <button onClick={handlePreviousPage} disabled={currentPage === 1} className="blue-button">Previous page</button>
                            <button onClick={handleNextPage} disabled={currentPage === totalPages} className="blue-button">Next page</button>
                            {roles.includes(1)?
                            <button onClick={handleSaveChanges} disabled={modifiedUsers.length === 0} className="blue-button">Save</button> : ""}
                        </div>
                    </>
                ) : (
                    <CircularIndeterminate />
                )}
            </div>
        </>
    );
}

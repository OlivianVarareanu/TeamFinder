import { useState, useEffect } from "react";
import axios from "axios";
import api from "../../api/api";
import CircularIndeterminate from "../../auth-logic/loading";
import "./TeamTable.css";

export default function TeamTable() {
    const [user, setUser] = useState(null);
    const [organizationUsers, setOrganizationUsers] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [roles, setRoles] = useState([]);
    const [modifiedUsers, setModifiedUsers] = useState([]);
    const [shouldRerender, setShouldRerender] = useState(false);
    const [selectedRoles, setSelectedRoles] = useState({});
    const [userActions, setUserActions] = useState({});
    const [loading, setLoading] = useState(false); // Starea pentru încărcare

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const responseUser = await api.get('api/user/me', { withCredentials: true });
                setUser(responseUser.data);
                setRoles(responseUser.data.user.roles);

                const responseOrganizationUsers = await fetchOrganizationUsers(currentPage);
                setOrganizationUsers(responseOrganizationUsers.users.sort((a, b) => a.name.localeCompare(b.name)));
                setTotalPages(responseOrganizationUsers.pagination.totalPages);
            } catch (error) {
                console.log(error);
            }
        };

        fetchProfile();
    }, [currentPage, shouldRerender]);

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

    const handleDeleteRole = async (userId, roleToDelete) => {
        setUserActions(prevState => ({ ...prevState, [userId]: true })); // Marchează începutul acțiunii pentru utilizatorul specific
        try {
            await axios.put(
                "/api/admin/delete-role",
                { userId: userId, role: roleToDelete },
                { withCredentials: true }
            );
            const updatedUsers = organizationUsers.map(user => {
                if (user._id === userId) {
                    return {
                        ...user,
                        roles: user.roles.filter(role => role !== roleToDelete)
                    };
                }
                return user;
            });
            setOrganizationUsers(updatedUsers);
            setShouldRerender(prevState => !prevState);
        } catch (error) {
            console.log('error', error);
        } finally {
            setUserActions(prevState => ({ ...prevState, [userId]: false })); // Marchează sfârșitul acțiunii pentru utilizatorul specific
        }
    };

    const handleSaveChanges = async () => {
        setLoading(true); // Începe încărcarea

        try {
            await Promise.all(modifiedUsers.map(async modifiedUser => {
                await axios.put(
                    "/api/admin/set-role",
                    { userId: modifiedUser.id, role: parseInt(modifiedUser.roles) },
                    { withCredentials: true }
                );
            }));

            // După ce s-au salvat modificările, actualizează lista de utilizatori
            const updatedUsers = await fetchOrganizationUsers(currentPage);
            setOrganizationUsers(updatedUsers.users.sort((a, b) => a.name.localeCompare(b.name)));
            setTotalPages(updatedUsers.pagination.totalPages);
            
            setModifiedUsers([]);
            setSelectedRoles({});
        } catch (error) {
            console.log('error', error);
        } finally {
            setLoading(false); // Termină încărcarea
        }
    };

    const handleCancel = (userId) => {
        const updatedSelectedRoles = { ...selectedRoles };
        delete updatedSelectedRoles[userId];
        setSelectedRoles(updatedSelectedRoles);
    };

    if (!user) {
        return <CircularIndeterminate />;
    }
    return (
        <div className="wrapper-table">
            {Array.isArray(organizationUsers) && organizationUsers.length > 0 ? (
                <>
                    <table className="users-table">
                        <thead>
                            <tr>
                                <th>NAME</th>
                                <th>EMAIL</th>
                                {roles.includes(1) && <th>AVAILABLE HOURS</th>}
                                {roles.includes(1) && <th>ROLES</th>}
                            </tr>
                        </thead>
                        <tbody>
                            {organizationUsers.map((orgUser) => (
                                <tr key={orgUser.email}>
                                    <td>{orgUser.name}</td>
                                    <td>{orgUser.email}</td>
                                    {roles.includes(1) && <td>{orgUser.availableHours}</td>}
                                    {roles.includes(1) && (
                                        <td className="roles-cell">
                                            {userActions[orgUser._id] ? (
                                                <CircularIndeterminate/>
                                            ) : (
                                                <>
                                                    {Array.isArray(orgUser.roles) ? (
                                                        orgUser.roles.map((role, index) => (
                                                            <span className="horizontal-cell" key={role}>
                                                                {mapRoles(role)}
                                                                {orgUser.roles.length > 1 && (
                                                                    <button className="delete-role-button" onClick={() => handleDeleteRole(orgUser._id, role)}>x</button>
                                                                )}
                                                                {index !== orgUser.roles.length -1 && <br />}
                                                            </span>
                                                        ))
                                                    ) : (
                                                        <span>
                                                            {mapRoles(orgUser.roles)}
                                                            {orgUser.roles !== null && (
                                                                <button className="delete-role-button" onClick={() => handleDeleteRole(orgUser._id, orgUser.roles)}>X</button>
                                                            )}
                                                        </span>
                                                    )}
                                                    {roles.includes(1) && orgUser.roles.length < 4 && (
                                                        <>
                                                            <br /><br />
                                                            <select className="add-role" value={selectedRoles[orgUser._id] || ""} onChange={(e) => {
                                                                setSelectedRoles(prevState => ({ ...prevState, [orgUser._id]: parseInt(e.target.value) }));
                                                                setModifiedUsers(prevState => [{ id: orgUser._id, roles: parseInt(e.target.value) }, ...prevState]);
                                                            }}>
                                                                <option value="" disabled>Add Role</option>
                                                                {[1, 2, 3, 4]
                                                                    .filter(role => !Array.isArray(orgUser.roles) || !orgUser.roles.includes(role))
                                                                    .map(role => (
                                                                        <option key={role} value={role}>{mapRoles(role)}</option>
                                                                    ))}
                                                            </select>
                                                            {selectedRoles[orgUser._id] && (
                                                                <button className="cancel-button" onClick={() => handleCancel(orgUser._id)}>Cancel</button>
                                                            )}
                                                        </>
                                                    )}
                                                </>
                                            )}
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="buttons-wrapper">
                        <button onClick={handlePreviousPage} disabled={currentPage === 1} className="blue-button">&lt;</button>
                        <button onClick={handleNextPage} disabled={currentPage === totalPages} className="blue-button">&gt;</button>
                        {roles.includes(1) && (
                            <button onClick={handleSaveChanges} disabled={modifiedUsers.length === 0 || loading} className="blue-button">Save</button>
                        )}
                    </div>
                </>
            ) : (
                <CircularIndeterminate/>
            )}
        </div>
    );
}

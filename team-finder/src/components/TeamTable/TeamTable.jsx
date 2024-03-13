import { useState, useEffect ,useRef} from "react";
import api from "../../api/api";
import CircularIndeterminate from "../../auth-logic/loading";
import "./TeamTable.css";

export default function () {

    const [user, setUser] = useState(null);
    const [organizationUsers, setOrganizationUsers] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                // Obține informațiile despre utilizatorul actual
                const responseUser = await api.get('api/user/me', { withCredentials: true });
                setUser(responseUser.data);

                // Obține lista de utilizatori ai organizației pentru pagina curentă
                const responseOrganizationUsers = await fetchOrganizationUsers(currentPage);
                setOrganizationUsers(responseOrganizationUsers.users);
                setTotalPages(responseOrganizationUsers.pagination.totalPages);

            } catch (error) {
                console.log(error);
            }
        };

        fetchProfile();
    }, [currentPage]);

    const fetchOrganizationUsers = async (page) => {
        const response = await api.get(`api/organization/users?page=${page}`, { withCredentials: true });
        return response.data;
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

    if (!user) {
        return <CircularIndeterminate />;
    }

    return (
        <>
            <div className="wrapper-table">
                {/* Verifică dacă organizationUsers este un array înainte de a apela map() */}
                {Array.isArray(organizationUsers) && organizationUsers.length > 0 ? (
                    <>
                        <table className="users-table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Available Hours</th>
                                </tr>
                            </thead>
                            <tbody>
                                {organizationUsers.map((orgUser) => (
                                    <tr key={orgUser.email}>
                                        <td>{orgUser.name}</td>
                                        <td>{orgUser.email}</td> 
                                        <td>{orgUser.availableHours}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="buttons-wrapper">
                        <button onClick={handlePreviousPage} disabled={currentPage === 1} className="blue-button">Previous page</button>
                        <button onClick={handleNextPage} disabled={currentPage === totalPages} className="blue-button">Next page</button>
                        </div>
                    </>
                ) : (
                    <CircularIndeterminate />
                )}
            </div>
        </>
    );
}

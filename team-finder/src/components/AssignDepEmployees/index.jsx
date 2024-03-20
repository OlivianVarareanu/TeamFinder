import { useState, useEffect } from "react";
import CircularIndeterminate from "../../auth-logic/loading";
import api from "../../api/api";
import "./index.css";
import apiURL from "../../../apiURL";

export default function AssignDepEmployees() {
  const [auth, setAuth] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedManagers, setSelectedManagers] = useState({});
  const [departmentManagers, setDepartmentManagers] = useState([]); // Store department managers

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const responseUser = await api.get(`${apiURL}/user/me`, {
          withCredentials: true,
        });
        setAuth(true);

        const responseDepartments = await fetchDepartments(currentPage);
        setDepartments(responseDepartments.departments);
        setTotalPages(responseDepartments.pagination.totalPages);
      } catch (error) {
        console.log(error);
        setError(error);
      }
    };

    fetchProfile();
  }, [currentPage]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`${apiURL}/organization/users`, {
          params: {
            page: 1,
            pageSize: 100,
            roles: 4, 
            hasDepartment: false,
          },
          withCredentials: true,
        });
        setDepartmentManagers(response.data.users);
      } catch (error) {
        console.log("Error fetching department managers:", error);
      }
    };

    fetchData();
  }, []); 

  const fetchDepartments = async (page) => {
    try {
      const response = await api.get(
        `${apiURL}/organization/get-departments?page=${page}`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.log("Error fetching departments:", error);
      return { departments: [], pagination: { totalPages: 0 } };
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

  const handleManagerChange = async (departmentId, managerId) => {
    try {
      console.log(managerId);
      await api.put(`${apiURL}/department/${departmentId}/set-manager`, {
        manager: managerId,
      });
    } catch (error) {
      console.log("Error updating manager:", error);
      // Handle error
    }
  };

  const handleSelectedManagerChange = (departmentId, managerId) => {
    setSelectedManagers((prevSelectedManagers) => ({
      ...prevSelectedManagers,
      [departmentId]: managerId,
    }));
    handleManagerChange(departmentId, managerId);

  };

  if (!auth) {
    return <CircularIndeterminate />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <table className="UpdateTable">
        <thead>
          <tr>
            <th>Name Department</th>
            <th>Department Manager</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((department, index) => (
            <tr key={index}>
              <td>{department.name}</td>
              <td>
                <select
                  value={selectedManagers[department.id] || ""}
                  onChange={(e) => {
                    console.log(e.target.value);
                    const managerId = e.target.value;
                    handleSelectedManagerChange(department._id, managerId);
                  }}
                >
                  <option value="">Select Manager</option>
                  {departmentManagers.map((manager, index) => {
                    if (manager.roles.includes(2)) {
                      return (
                        <option key={index} value={manager._id}>
                          {manager.name}
                        </option>
                      );
                    }
                    return null;
                  })}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="buttons-wrapper">
        <button
          onClick={handlePreviousPage}
          className="blue-button"
          disabled={currentPage === 1}
        >
          Previous page
        </button>
        <button
          onClick={handleNextPage}
          className="blue-button"
          disabled={currentPage === totalPages}
        >
          Next page
        </button>
      </div>
    </div>
  );
}
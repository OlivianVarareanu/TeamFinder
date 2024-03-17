import { useState, useEffect } from "react";
import CircularIndeterminate from "../../../auth-logic/loading";
import api from "../../../api/api";
import "./index.css";
import { Link } from "react-router-dom";

export default function UpdateDepartment() {
  const [auth, setAuth] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const responseUser = await api.get("api/user/me", {
          withCredentials: true,
        });
        setAuth(true); // Set auth to true upon successful user fetch
  
        const responseDeparments = await fetchDepartments(currentPage);
        console.log(responseDeparments);
        setDepartments(responseDeparments.departments);
        setTotalPages(responseDeparments.pagination.totalPages);
      } catch (error) {
        console.log(error);
        setError(error); 
      }
    };
  
    fetchProfile();
  }, [currentPage]);

  const fetchDepartments = async (page) => {
    const response = await api.get(`/api/organization/get-departments?page=${page}`, {
      withCredentials: true,
    });
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

  if (!auth) {
    return <CircularIndeterminate />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const startIndex = (currentPage - 1) * 10;
  const endIndex = startIndex + 10;
  const displayedDepartments = departments.slice(startIndex, endIndex);

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
              <td>{department.manager?.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="buttons-wrapper">
        <button
          onClick={handlePreviousPage}
          className="blue-button"
          disabled={currentPage === 1} // Disable if on the first page
        >
          Previous page
        </button>
        <button
          onClick={handleNextPage}
          className="blue-button"
          disabled={currentPage === totalPages} // Disable if on the last page
        >
          Next page
        </button>
        
      </div>
    </div>
  );
}

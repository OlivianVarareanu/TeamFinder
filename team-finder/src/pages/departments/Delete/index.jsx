import { useState, useEffect } from "react";
import CircularIndeterminate from "../../../auth-logic/loading";
import api from "../../../api/api";
import { TextField, Button, Typography, Link } from "@mui/material";
import "./index.css";

export default function DeleteDepartment() {
  const [auth, setAuth] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteInput, setDeleteInput] = useState("");
  const [deleteMessage, setDeleteMessage] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const responseUser = await api.get("api/user/me", {
          withCredentials: true,
        });
        setAuth(true); // Set auth to true upon successful user fetch

        const responseDepartments = await fetchDepartments(currentPage);
        setDepartments(responseDepartments.departments);
        setTotalPages(responseDepartments.pagination.totalPages);
      } catch (error) {
        setError(error.message); // Set error message instead of error object
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

  const deleteDepartment = async (departmentName) => {
    try {
      const department = departments.find((dept) => dept.name === departmentName);
      if (!department) {
        throw new Error("Department not found");
      }
      const response = await api.delete(`/api/department/delete-department/${department._id}`, {
        withCredentials: true,
      });
      if (response.status === 200) {
        const updatedDepartments = departments.filter(dept => dept._id !== department._id);
        setDepartments(updatedDepartments);
        setDeleteInput("");
        setDeleteMessage("Department has been deleted successfully");
        setError(null);
      } else {
        throw new Error("Failed to delete department");
      }
    } catch (error) {
      setError(error.message); // Set error message instead of error object
    }
  };

  if (!auth) {
    return <CircularIndeterminate />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div>
      <TextField
        label="Enter department name to delete"
        value={deleteInput}
        onChange={(e) => setDeleteInput(e.target.value)}
        variant="outlined"
        style={{ marginBottom: "10px" }}
      />
      <Button
        variant="contained"
        color="error"
        onClick={() => deleteDepartment(deleteInput)}
        style={{ marginRight: "10px" }}
      >
        Delete Department
      </Button>
      {deleteMessage && <Typography variant="subtitle1" style={{ color: "green" }}>{deleteMessage}</Typography>}
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
              <td>{department.manager}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="buttons-wrapper">
        <Button
          variant="contained"
          color="primary"
          onClick={handlePreviousPage}
          disabled={currentPage === 1} // Disable if on the first page
          style={{ marginRight: "10px" }}
        >
          Previous page
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleNextPage}
          disabled={currentPage === totalPages} // Disable if on the last page
        >
          Next page
        </Button>
      </div>
    </div>
  );
}

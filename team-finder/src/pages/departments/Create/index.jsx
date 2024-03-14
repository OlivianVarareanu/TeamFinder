import React, { useState, useEffect } from "react";
import "./index.css";
import { Typography, TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios"; // Import Axios library
import api from "../../../api/api";
import CircularIndeterminate from "../../../auth-logic/loading";

export default function CreateDepartment() {
  const [departmentName, setDepartmentName] = useState("");
  // const [departments, setDepartments] = useState({});

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await api.get('/api/organization/get-departments', { withCredentials: true });
        console.log("raspuns ===:", response); 
        if (response && response.status === 200) {
          
        } 
      } catch (error) {
        console.error("Error fetching departments:", error);
        
      }
    };
    fetchDepartments();
  },[]
  )
    const FetchCreateDepartment = async (departmentName) => {
      try {
        console.log(departmentName)
        const response = await api.post(
          "/api/department/create",{
            department: {
                name:departmentName,
            }
    
          },
          {
            withCredentials:true,
          }
        );
        console.log("Added department:", response.data);
      } catch (error) {
        console.error("Error adding department:", error);
      }
    };
  return (
    <div>
      <div className="CreateDepartmentWrapper">
        <Typography variant="h4">Enter Department Name : </Typography>
        <TextField
          value={departmentName}
          onChange={(e) => setDepartmentName( e.target.value )}
        />
        <Button
          variant="contained"
          color="success"
          onClick={() => FetchCreateDepartment(departmentName)}
        >
          Add Department
        </Button>
      </div>
      <Link to="/departments">
        <Button variant="contained">BACK</Button>
      </Link>
    </div>
  );
}



  



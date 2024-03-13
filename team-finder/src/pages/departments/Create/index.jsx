import React, { useState, useEffect } from "react";
import "./index.css";
import { Typography, TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios"; // Import Axios library
import api from "../../../api/api";
import CircularIndeterminate from "../../../auth-logic/loading";

export default function CreateDepartment() {
  const [departmentName, setDepartmentName] = useState("");
  const [department, setDepartment] = useState({});

  const [auth, setAuth] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("api/user/me", {
          withCredentials: true,
        });
        if (response.status === 200) {
          setAuth(true);
        } else {
          setAuth(false);
        }
      } catch (error) {
        console.log("se incarca info");
      }
    };
    fetchProfile();
  }, []);

  if (!auth) {
    return CircularIndeterminate();
  }
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


const FetchCreateDepartment = async (departmentName) => {
  try {
    const response = await axios.post(
      "https://teamfinderapp.azurewebsites.net/api/department/create",{
        department: {
            name: departmentName
        }

      },
      
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")} `,
        },
      }
    );
    console.log("Added department:", response.data);
  } catch (error) {
    console.error("Error adding department:", error);
  }
};

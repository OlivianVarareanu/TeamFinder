import React, { useState } from "react";
import { Typography, TextField, Button, Grid, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import api from "../../../api/api";

export default function CreateDepartment() {
  const [departmentName, setDepartmentName] = useState("");
  const [error, setError] = useState(null);

  const FetchCreateDepartment = async () => {
    try {
      const response = await api.post(
        "/api/department/create",
        {
          department: {
            name: departmentName,
          }
        },
        {
          withCredentials: true,
        }
      );
      console.log("Added department:", response.data);
      // Clear input field and reset error state on successful creation
      setDepartmentName("");
      setError(null);
    } catch (error) {
      console.error("Error adding department:", error);
      setError(error.message || "An error occurred while adding the department.");
    }
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ minHeight: "100vh" }}>
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Paper elevation={3} sx={{ padding: 4 }}>
          <Typography variant="h4" gutterBottom sx={{ textAlign: "center", marginBottom: 3 }}>
            Create Department
          </Typography>
          <TextField
            fullWidth
            label="Department Name"
            value={departmentName}
            onChange={(e) => setDepartmentName(e.target.value)}
            variant="outlined"
            margin="normal"
            sx={{ marginBottom: 2 }}
          />
          {error && <Typography variant="body2" color="error" gutterBottom>{error}</Typography>}
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={FetchCreateDepartment}
            disabled={!departmentName.trim()}
            sx={{ marginBottom: 2 }}
          >
            Add Department
          </Button>
          <Link to="/departments" style={{ textDecoration: "none" }}>
            <Button fullWidth variant="outlined">
              Back
            </Button>
          </Link>
        </Paper>
      </Grid>
    </Grid>
  );
}

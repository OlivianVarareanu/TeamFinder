import React, { useState } from "react";
import "./createNewProject.css";
import { Typography, TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function CreateNewProject() {
  const [title, setTitle] = useState("");
  const [editable, setEditable] = useState(true);

  const handleSave = () => {
    setEditable(false);
  };

  const handleEdit = () => {
    setEditable(true);
  };

  return (
    <div>
      <Typography className="ProjectTitleLabel" variant="h5">
        Enter Project Title:
      </Typography>
      <TextField
        className="TitleInput"
        placeholder="Title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={!editable}
      />
      {editable ? (
        <Button className="SaveButton" variant="contained" onClick={handleSave}>
          Save
        </Button>
      ) : (
        <Button
          className="EditButton"
          variant="contained"
          onClick={handleEdit}
        >
          Edit
        </Button>
      )}
      <div className="Footer">
        <Button 
        component={Link}
        to="/team"
        className="AddEmployeeBtn" variant="contained">
          Add Employee
        </Button>
      </div>
    </div>
  );
}

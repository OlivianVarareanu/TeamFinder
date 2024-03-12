import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import "./CreateProject.css";
import { useState } from "react";

export default function CreateProject() {
  const [isAdmin, setAdmin] = useState(true);
  const [hasProject, setHasProject] = useState(true);

  return (
    <>
      <div className="options-container">
        {hasProject ? (
          <Link to="/projects">
            <div className="viewProjectBtn">
              <Button variant="contained">View Your Projects</Button>
            </div>
          </Link>
        ) : (
          ""
        )}

        {isAdmin ? (
          <Link to="/CreateNewProject">
            <div className="createProjectBtn">
              <Button variant="contained">Create New Project</Button>
            </div>
          </Link>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

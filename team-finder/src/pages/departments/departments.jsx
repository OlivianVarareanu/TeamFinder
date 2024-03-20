import React, { useState, useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import "./departments.css";
import api from "../../api/api";
import CircularIndeterminate from "../../auth-logic/loading";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import AssignDepManager from "../../components/AssignDepManager";
import apiURL from "../../../apiURL";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function Departments() {
  const [user, setUser] = useState(null);
  const [value, setValue] = useState("one");
  const [isClickedCreate, setIsClickedCreate] = useState(false);
  const [isClickedUpdate, setIsClickedUpdate] = useState(false);
  const [isClickedDelete, setIsClickedDelete] = useState(false); 
  const [roles,setRoles] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get(`${apiURL}/user/me`, {
          withCredentials: true,
        });
        setUser(response.data);
       setRoles(response.data.user.roles);
      } catch (error) {
        console.log("Error fetching user data:", error);
      }
    };
    fetchProfile();
  }, []);

  if (!user) {
    return <CircularIndeterminate />;
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
    
    <Box sx={{ width: "100%" }}>
      <Tabs
        centered
        value={value}
        onChange={handleChange}
        textColor="primary"
        indicatorColor="primary"
        aria-label="secondary tabs example"
      >
        <Tab value="one" label="Create/Delete/Update Department" />
        <Tab value="two" label="Assign Department Manager" />
        <Tab value="three" label="Assign Department Employees" />
      </Tabs>
      <TabPanel value={value} index="one">
        <div className="ButtonsWrapper">
          {value === "one" && (
            <>
                <Link to="/create">
              <Button
                  className="CreateBtnDep"
                  sx={{ width: 150, height: 50 }}
                  variant="contained"
                  color="success"
                  onClick={() => setIsClickedCreate(!isClickedCreate)}
                >
                  CREATE
                </Button>
              </Link>
              <Link to="/createskills">
              <Button
                  className="CreateBtnDep"
                  sx={{ width: 150, height: 50 }}
                  variant="contained"
                  color="success"
                  onClick={() => setIsClickedCreate(!isClickedCreate)}
                >
                  CREATE_SKILLS 
                </Button>
              </Link>
              
              <Link to="/update">
                <Button
                  sx={{ width: 150, height: 50 }}
                  variant="contained"
                  color="secondary"
                  onClick={() => setIsClickedUpdate(!isClickedUpdate)}
                >
                  UPDATE
                </Button>
              </Link>
              <Link to="/delete">
                <Button
                  sx={{ width: 150, height: 50 }}
                  variant="contained"
                  color="error"
                  onClick={() => setIsClickedDelete(!isClickedDelete)}
                >
                  DELETE
                </Button>
              </Link>
              {/* <Link to="/skill-list">
                <Button
                  sx={{ width: 150, height: 50 }}
                  variant="contained"
                  color="error"
                  onClick={() => setIsClickedDelete(!isClickedDelete)}
                >
                  View Skill List
                </Button>
              </Link> */}
            </>
          )}
          {value === "two" && <AssignDepManager />}
        </div>
      </TabPanel>
      <TabPanel value={value} index="two">
        {value === "two" && <AssignDepManager />}
      </TabPanel>
    </Box>
    </div>
  );
}

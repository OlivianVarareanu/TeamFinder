import React, { useState, useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import "./departments.css";
import api from "../../api/api";
import CircularIndeterminate from "../../auth-logic/loading";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

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


  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("api/user/me", {
          withCredentials: true,
        });
        setUser(response.data);
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
          <Link to ="/create">
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

            <Link to="/update">
              <Button
                sx={{ width: 150, height: 50 }}
                variant="contained"
                color="secondary"
                onClick={() => setIsClickedUpdate(!isClickedUpdate )}
                
              >
                UPDATE
              </Button>
              </Link>
              <Link to ="/delete">
              <Button
                sx={{ width: 150, height: 50 }}
                variant="contained"
                color="error"
                onClick={() => setIsClickedDelete(!isClickedDelete)}
              >
                DELETE
              </Button>
              </Link>
            
          
        </div>
        
          
        
      </TabPanel>
    </Box>
  );
}

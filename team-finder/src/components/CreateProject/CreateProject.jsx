import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import "./CreateProject.css";
import { useEffect, useState } from "react";
import CircularIndeterminate from "../../auth-logic/loading";
import api from "../../api/api";
import CreateNewProject from "../CreateNewProject/CreateNewProject";
import ViewProjects from "../ViewProjects/ViewProjects";
import apiURL from "../../../apiURL";


export default function CreateProject() {

  const [hasProject, setHasProject] = useState(true);
  const [roles, setRoles] = useState([]);

  const[auth,setAuth]=useState(false);

  useEffect(()=> {
      const fetchProfile = async () => {
          try {
              const response = await api.get(`${apiURL}/user/me`,{withCredentials:true});
              if(response.status===200)
              {
                  setAuth(true);
                  setRoles(response.data.user.roles);
              }
              else {
                  setAuth(false);
              }
              
          }
          catch(error){
              console.log('se incarca info',error);
              
          }
          }
          fetchProfile();
      },[]);

  if(!auth){
          return CircularIndeterminate();
      }

  return (
    <>
      <div className="options-container">
        
        {hasProject ? (
          <Link to="/projects/view" variant="contained">
            <div className="view-projects">
              <Button variant="contained">View Your Projects</Button>
            </div> 
          </Link>
        ) : "" }
        

        {auth ? (
          <Link to="/projects/create-new-project">
            <div className="create-project">
              <Button variant="contained">CREATE NEW PROJECT</Button>
            </div> 
          </Link>
        ) : "" } 
        
      </div>
    </>
  )
}

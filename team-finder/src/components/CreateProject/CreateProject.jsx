import "./CreateProject.css"
import { useState } from "react"

export default function CreateProject ()
{
   const [isAdmin,setAdmin]=useState(true);
   const [hasProject,setHasProject]=useState(true);
   
 return (
    <>

    
    <div className="options-container">
    {hasProject?<a href="">
        <div className="view-projects">
            <h1>VIEW PROJECTS</h1>
        </div>
        </a>
    :""
    }


      {isAdmin?<a href="">
          
          <div className="create-project">
              <h1>CREATE NEW PROJECT</h1>
          
          </div>
          </a>:""}
        
        
    </div>
    </>
 )
}
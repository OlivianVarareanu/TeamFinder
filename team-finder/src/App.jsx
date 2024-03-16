import Navbar from "./components/Navbar/Navbar"
import {Routes, Route} from 'react-router-dom'
import Departments from "./pages/departments/departments"
import Notifications from "./pages/notifications/notifications"
import Profile from "./pages/profile/profile"
import Projects from "./pages/projects/projects"
import Team from "./pages/team/team"

import { PrivateRoutes } from "./auth-logic/privateRoutes"
import CreateDepartment from "./pages/departments/Create"
import DeleteDepartment from "./pages/departments/Delete"
import UpdateDepartment from "./pages/departments/Update"
import CreateNewProject from "./components/CreateNewProject/CreateNewProject"
import ViewProjects from "./components/ViewProjects/ViewProjects"
import "./App.css"


function App() {


  return (
    <>

    <div className="app-wrapper">

    <Navbar/>

    <div className="app-content">

    <Routes>
      <Route element={<PrivateRoutes />} >
        <Route index element={<Projects/>} />
        <Route path="/projects" element={<Projects/>} />
        <Route path="/team" element={<Team/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/notifications" element={<Notifications/>}/>
        <Route path="/departments" element={<Departments/>}/>
        <Route path="/projects/create-new-project" element={<CreateNewProject/>}/>
        <Route path="/projects/view" element={<ViewProjects/>}/>
        <Route path="/create" element={<CreateDepartment/>}/>
        <Route path="/update" element={<UpdateDepartment/>}/>
        <Route path="/delete" element={<DeleteDepartment/>}/>
        <Route path="*" element={<noPage/>}/>

      </Route>
    </Routes>
    </div>

    </div>


    </>
  )
}

export default App

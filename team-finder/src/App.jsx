import Navbar from "./components/Navbar/Navbar"
import {Routes, Route} from 'react-router-dom'
import Departments from "./pages/departments/departments"
import Notifications from "./pages/notifications/notifications"
import Profile from "./pages/profile/profile"
import Projects from "./pages/projects/projects"
import Team from "./pages/team/team"
import { PrivateRoutes } from "./auth-logic/privateRoutes"


function App() {


  return (
    <>
    

    <div className="wrapper">


    <Navbar/>


    <div className="content">
      
      <Routes>
        <Route element={<PrivateRoutes />} >
          <Route index element={<Projects/>} />
          <Route path="/projects" element={<Projects/>} />
          <Route path="/team" element={<Team/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/notifications" element={<Notifications/>}/>
          <Route path="/departments" element={<Departments/>}/>
          <Route path="*" element={<noPage/>}/>
        </Route>
      </Routes>
    </div>

    </div>


    </>
  )
}

export default App

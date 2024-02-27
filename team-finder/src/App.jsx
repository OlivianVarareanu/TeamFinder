
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Departments from "./pages/departments/departments"
import Notifications from "./pages/notifications/notifications"
import Profile from "./pages/profile/profile"
import Projects from "./pages/projects/projects"
import Team from "./pages/team/team"
import noPage from "./pages/noPage/noPage"
import SignUp from "./pages/SignUp/SignUp"
import LogIn from "./pages/LogIn/LogIn"
import Navbar from './components/Navbar/Navbar'

function App() {

  return (
    <>
    
    <BrowserRouter>

    
    <div className='window'>
    
    <Navbar>
    </Navbar>
    

    <div className="content">
      

      <Routes>
        <Route index element={<Projects/>} />
        <Route path="/projects" element={<Projects/>} />
        <Route path="/team" element={<Team/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/notifications" element={<Notifications/>}/>
        <Route path="/departments" element={<Departments/>}/>
        <Route path="/login" element={<LogIn/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="*" element={<noPage/>}/>
      </Routes>
    </div>
    </div>

   

    </BrowserRouter>
    </>
  )

 
}

export default App

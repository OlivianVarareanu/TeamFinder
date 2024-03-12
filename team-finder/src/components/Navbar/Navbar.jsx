import "./Navbar.css"
import {Link,useNavigate} from 'react-router-dom'
import Logout from "./Logout"

export default function Navbar ()
{

  


    return (
        <>
        
        <nav>
                <div className="nav-wrapper">

                    <ul className="nav-frame">
                        <li className="logo-wrapper">
                        <img className="logo-image" src="/src/assets/Logo.png" alt="" />
                        </li>

                        <li>
                            <Link to="/projects" className="anchor">
                            <img src="/src/assets/project-icon.png"></img>
                            <span className="nav-item">PROJECTS</span>
                            </Link>
                        </li>

                        <li>
                            <Link to="/team" className="anchor">
                            <img src="/src/assets/team-icon.png" alt="" />
                            <span className="nav-item">ORGANIZATION</span>
                            </Link>
                            
                        </li>

                        <li>
                            <Link to="/departments" className="anchor">
                            <img src="/src/assets/department-icon.png" alt="" />
                            <span className="nav-item">DEPARTMENTS</span>
                            </Link>
                        </li>

                        <li>
                            <Link to="/notifications" className="anchor">
                            <img src="/src/assets/notification-icon.png" alt="" />
                            <span className="nav-item">NOTIFICATIONS</span>
                            </Link>
                        </li>

                        <li>
                            <Link to="/profile" className="anchor">
                            <img src="/src/assets/profile-icon.png" alt="" />
                            <span className="nav-item">PROFILE</span>
                            </Link>
                        </li>


                        <li>

                        <button className="anchor" onClick={Logout}>
                        <img className="logout-icon" src="/src/assets/logout-icon.png" alt="" />
                        <span className="nav-item">LOG OUT</span>
                        </button>

                        </li>         
                    </ul>
                </div> 
        </nav>
        </>
    )
}
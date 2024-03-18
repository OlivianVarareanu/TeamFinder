import "./Navbar.css"
import {Link,useNavigate} from 'react-router-dom'
import Logout from "./Logout"
import Logo from '/src/assets/Logo.png';
import ProjectIcon from '/src/assets/project-icon.png';
import Organization from '/src/assets/team-icon.png';
import Departments from '/src/assets/department-icon.png';
import Notifications from '/src/assets/notification-icon.png';
import Profile from '/src/assets/profile-icon.png';
import LogoutIcon from '/src/assets/logout-icon.png';

export default function Navbar ()
{

  


    return (
        <>
        
        <nav>
                <div className="nav-wrapper">

                    <ul className="nav-frame">
                        <li className="logo-wrapper">
                        <img className="logo-image" src={Logo} alt="" />
                        </li>

                        <li>
                            <Link to="/projects" className="anchor">
                            <img src={ProjectIcon}></img>
                            <span className="nav-item">PROJECTS</span>
                            </Link>
                        </li>

                        <li>
                            <Link to="/team" className="anchor">
                            <img src={Organization} alt="" />
                            <span className="nav-item">ORGANIZATION</span>
                            </Link>
                            
                        </li>

                        <li>
                            <Link to="/departments" className="anchor">
                            <img src={Departments} alt="" />
                            <span className="nav-item">DEPARTMENTS</span>
                            </Link>
                        </li>

                        <li>
                            <Link to="/notifications" className="anchor">
                            <img src={Notifications} alt="" />
                            <span className="nav-item">NOTIFICATIONS</span>
                            </Link>
                        </li>

                        <li>
                            <Link to="/profile" className="anchor">
                            <img src={Profile} alt="" />
                            <span className="nav-item">PROFILE</span>
                            </Link>
                        </li>


                        <li>

                        <button className="anchor" onClick={Logout}>
                        <img className="logout-icon" src={LogoutIcon} alt="" />
                        <span className="nav-item">LOG OUT</span>
                        </button>

                        </li>         
                    </ul>
                </div> 
        </nav>
        </>
    )
}
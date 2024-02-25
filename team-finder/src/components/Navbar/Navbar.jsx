import "./Navbar.css"
export default function Navbar ()
{


    return (
        <>
        <nav>
       
            
               
            <ul className="nav-frame">
                <li>
                    <a href="#" className="logo">
                    <img src="/src/assets/Logo.png" alt="" />
                    </a>
                </li>

                <li>
                    <a href="#" >
                    <img src="/src/assets/project-icon.png"></img>
                    <span className="nav-item">PROJECTS</span>
                    </a>
                </li>

                <li>
                    <a href="#" >
                    <img src="/src/assets/team-icon.png" alt="" />
                    <span className="nav-item">TEAM</span>
                    </a>
                    
                </li>

                <li>
                    <a href="#" >
                    <img src="/src/assets/department-icon.png" alt="" />
                    <span className="nav-item">DEPARTMENTS</span>
                    </a>
                </li>

                <li>
                    <a href="#" >
                    <img src="/src/assets/notification-icon.png" alt="" />
                    <span className="nav-item">NOTIFICATIONS</span>
                    </a>
                </li>

                <li>
                    <a href="#" >
                    <img src="/src/assets/profile-icon.png" alt="" />
                    <span className="nav-item">PROFILE</span>
                    </a>
                </li>

                <li>
                    <a href="#" className="logout">
                    <img className="logout-icon" src="/src/assets/logout-icon.png" alt="" />
                    <span className="nav-item">LOG OUT</span>
            </a>
                </li>
            </ul>

            

        </nav>
        </>
    )
}
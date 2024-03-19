import React, { useState, useEffect } from 'react';
import apiURL from "../../../apiURL";
import api from "../../api/api";
import CircularIndeterminate from "../../auth-logic/loading";
import "./CreateNewProject.css"
import { useNavigate } from 'react-router-dom';

export default function CreateNewProject() {
    const [auth, setAuth] = useState(false);
    const [roles, setRoles] = useState([]);
    const [userRoles,setUserRoles] = useState([]);
    const [projectData, setProjectData] = useState({
        name: "",
        period: "Fixed",
        startDate: "",
        deadlineDate: "",
        status: "Not Started",
        generalDescription: "",
        technologyStack: "",
        selectedRole: "", // Rolul selectat
        selectedRoleMembers: 1, // Numărul de membri pentru rolul selectat
        teamRoles: []
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await api.get(`${apiURL}/user/me`, { withCredentials: true });
                if (response.status === 200) {
                    setAuth(true);
                    setUserRoles(response.data.user.roles);
                } else {
                    setAuth(false);
                }
            } catch (error) {
                console.log('se incarca info', error);
            }
        };

        const fetchTeamRoles = async () => {
            try {
                const rolesResponse = await api.get(`${apiURL}/admin/get-team-roles?all=true`, { withCredentials: true });
                if (rolesResponse.status === 200) {
                    setRoles(rolesResponse.data.teamRoles);
                }
            } catch (error) {
                console.log('eroare la aducerea rolurilor de echipa', error);
            }
        };

        fetchProfile();
        fetchTeamRoles();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProjectData({ ...projectData, [name]: value });
    };

    const handleTeamRoleSelect = (e) => {
        const selectedRole = e.target.value;
        setProjectData({ ...projectData, selectedRole });
    };

    const handleMembersChange = (e) => {
        const selectedRoleMembers = parseInt(e.target.value);
        setProjectData({ ...projectData, selectedRoleMembers });
    };

    const addTeamRole = () => {
        const { selectedRole, selectedRoleMembers } = projectData;
        const roleObject = roles.find(role => role.name === selectedRole);
        if (roleObject) {
            const teamRole = { name: roleObject.name, membersNeeded: selectedRoleMembers };
            setProjectData({
                ...projectData,
                teamRoles: [...projectData.teamRoles, teamRole],
                selectedRole: "", // Resetăm rolul selectat după adăugarea lui
                selectedRoleMembers: 1 // Resetăm numărul de membri selectat
            });
        }
    };


    if (!auth) {
        return <CircularIndeterminate />;
    }


  

    const handleCreateProject = async () => {
        console.log(userRoles);
        if (userRoles.includes(3)) {
            if (projectData.name && projectData.period && projectData.startDate && projectData.status && projectData.generalDescription && projectData.technologyStack && projectData.teamRoles.length > 0) {


                const data = {
                    project: {
                        ...projectData
                    }
                };
                console.log(data);
                try {
                    const response = await api.post(`${apiURL}/project/create-project`, data, { withCredentials:true });
                    console.log(response.data); // Răspunsul de la server
                    if(response.status===200){
                    alert("Project created successfully!");
                    
                    

                    setProjectData({
                        name: "",
                        period: "Fixed",
                        startDate: "",
                        deadlineDate: "",
                        status: "Not Started",
                        generalDescription: "",
                        technologyStack: "",
                        teamRoles: []
                    });
                }
                } catch (error) {
                    console.error('eroare', error);
                    alert("Unexpected error.");
                }
            } else {
                alert("Please fill all the fields!");
            }
        } else {
            console.log("You can't create a new project.");
        }
    };

    if (!auth) {
        return <CircularIndeterminate />;
    }

    return (
        <div className='new-project-input'>
            <div className='new-project-form'>
                <center><p>Create new Project</p></center>
                <br/>
                <div className='item-separator'>
                    {/* Numele proiectului */}
                    <div>
                        <label>Project Name:</label>
                    </div>
                    <div>
                        <input type="text" name="name" value={projectData.name} onChange={handleInputChange} />
                    </div>
                </div>
                <div className='item-separator'>
                    {/* Perioada proiectului */}
                    <div>
                        <label>Period:</label>
                    </div>
                    <div>
                        <select name="period" value={projectData.period} onChange={handleInputChange}>
                            <option value="Fixed">Fixed</option>
                            <option value="Ongoing">Ongoing</option>
                        </select>
                    </div>
                </div>
                <div className='item-separator'>
                    {/* Data de start */}
                    <div>
                        <label>Start Date:</label>
                    </div>
                    <div>
                        <input type="date" name="startDate" value={projectData.startDate} onChange={handleInputChange} />
                    </div>
                </div>
                {projectData.period === "Fixed" && (
                    <div className='item-separator'>
                        {/* Data limită */}
                        <div>
                            <label>Deadline:</label>
                        </div>
                        <div>
                            <input type="date" name="deadlineDate" value={projectData.deadlineDate} onChange={handleInputChange} />
                        </div>
                    </div>
                )}
                <div className='item-separator'>
                    {/* Statusul proiectului */}
                    <div>
                        <label>Status:</label>
                    </div>
                    <div>
                        <select name="status" value={projectData.status} onChange={handleInputChange}>
                            <option value="Not Started">Not Started</option>
                            <option value="Starting">Starting</option>
                        </select>
                    </div>  
                </div>
                <div className='item-separator'>
                    {/* Descrierea generală */}
                    <div>
                        <label>General Description:</label>
                    </div>
                    <div>
                        <textarea name="generalDescription" value={projectData.generalDescription} onChange={handleInputChange}></textarea>
                    </div>
                </div>
                <div className='item-separator'>
                    {/* Tehnologiile utilizate */}
                    <label>Used technologies:</label>
                    <input type="text" name="technologyStack" value={projectData.technologyStack} onChange={handleInputChange} />
                </div>
                <div className='item-separator'>
                    {/* Selector pentru selecția rolurilor de echipă */}
                    <div>
                        <label>Team Role:</label>
                    </div>
                    <div></div>
                    <select value={projectData.selectedRole} onChange={handleTeamRoleSelect}>
                        <option value="">Select team role</option>
                        {roles.map((role, index) => (
                            <option key={index} value={role.name}>{role.name}</option>
                        ))}
                    </select>
                </div>
                {/* Afișăm input-ul pentru numărul de membri doar dacă a fost selectat un rol */}
                {projectData.selectedRole && <div className='item-separator'>
                
                    <div>
                        <label>Members number</label>
                        <input type="number" min="1" value={projectData.selectedRoleMembers} onChange={handleMembersChange} />
                    </div>
                
                
                    <button onClick={addTeamRole}>Add Role</button>
                </div>}
                {/* Butonul pentru crearea proiectului */}
                <div className='button-separator'>
                    <button className='create-project-button' onClick={handleCreateProject}>Create Project</button>
                </div>
            </div>
        </div>
    );
}

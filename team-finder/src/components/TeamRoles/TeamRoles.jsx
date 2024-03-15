import React, { useState, useEffect } from "react";
import api from "../../api/api";
import CircularIndeterminate from "../../auth-logic/loading";
import axios from "axios";
import "./TeamRoles.css"
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';

const TeamRoles = () => {
    const [auth, setAuth] = useState(false);
    const [newRoleName, setNewRoleName] = useState("");
    const [selectedEditRole, setSelectedEditRole] = useState("");
    const [allRoles, setAllRoles] = useState([]);
    const [editRoleName, setEditRoleName] = useState("");
    const [selectedDeleteRole, setSelectedDeleteRole] = useState("");
    const [deleteRoleName, setDeleteRoleName] = useState("");
    const [roles, setRoles] = useState([]);
    const [shouldRerender,setShouldRerender] = useState(false);


    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await api.get('api/user/me', {pageSize:20},{ withCredentials: true });
                if (response.status === 200) {
                    setAuth(true);
                    setRoles(response.data.user.roles);
                    // Fetch all roles for editing and deleting
                    const rolesResponse = await api.get(`api/admin/get-team-roles?all=true`, { withCredentials: true });
                    if (rolesResponse.status === 200) {
                        setAllRoles(rolesResponse.data.teamRoles);
                        console.log('roluri=',rolesResponse);
                    }
                } else {
                    setAuth(false);
                }
            } catch (error) {
                console.log('se incarca info', error);
            }
        }
        fetchProfile();
    }, [shouldRerender]);

    const handleCreateRole = async () => {
        try {
            const response = await api.post('api/admin/create-team-role', { name: newRoleName });
            if (response && response.status === 200) {
            console.log("Role created successfully!");
            setShouldRerender(!shouldRerender);
            setNewRoleName(""); // Clear the input after creation
            }
        } catch (error) {
            console.error("Error creating role:", error);
        }
    };

    const handleUpdateRole = async () => {

        if(editRoleName.length===0){
            alert('Role name too short');
            return;
        }
        try {
            const response = await api.put('api/admin/update-team-role', { oldName: selectedEditRole, newName: editRoleName },{withCredentials:true});
           
            if (response && response.status === 200) {
                console.log("Role updated successfully!");
                setShouldRerender(!shouldRerender);
                setEditRoleName(""); // Clear the input after update
            } else {
                console.error("Failed to update role:", response);
            }
        } catch (error) {
            console.error("Error updating role:", error);
            console.log(selectedEditRole);
        }
    };
    
    async function handleDeleteRole() {
        try {
            const response = await axios.delete("/api/admin/delete-team-role",  {
              data:  { name: selectedDeleteRole },
              headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
              }
      
            } );
      
            if (response.status === 200) {
                console.log("Role deleted successfully!");
                setShouldRerender(!shouldRerender);
                setSelectedDeleteRole("");
            } else {
                console.error("Failed to delete role:", response.data);
            }
        } catch (error) {
            console.error("Error deleting role:", error);
        }
      };
    
    
    

    return (<>
       
       {roles.includes(1)&&
        <div className="team-roles-container">
            <div className="role-title">
                <h2>Team Roles</h2>
            </div>

            <div className="separator-container">
                <div>
                    <input placeholder="Enter a new team role" className="team-input" type="text" value={newRoleName} onChange={(e) => setNewRoleName(e.target.value)} />     
                </div>
                
                
                <div>
                    <button className="role-button" onClick={handleCreateRole}>Create Role</button>
                </div>
            </div>

            <div>
                <div className="separator-container">
                    <div>
                        <div>
                            <select className="team-input" value={selectedEditRole} onChange={(e) => setSelectedEditRole(e.target.value)}>
                                <option value="">Select a role to edit</option>
                                {allRoles && allRoles.map(role => (
                                    <option key={role.name} value={role.name}>{role.name}</option>
                                ))}
                            </select>


                        </div>
                        <div>
                            <input placeholder="Enter the new name for the role" className="team-input" type="text" value={editRoleName} onChange={(e) => setEditRoleName(e.target.value)} />
                        </div>
                    </div>
                    <div>
                        <button className="role-button" onClick={handleUpdateRole}>Edit Role</button>
                    </div>
                </div>
                
            </div>

            <div className="separator-container">
           
                <select className="team-input" value={selectedDeleteRole} onChange={(e) => setSelectedDeleteRole(e.target.value)}>
                    <option value="">Select a role to delete</option>
                    {allRoles && allRoles.map(role => (
                        <option key={role.name} value={role.name}>{role.name}</option>
                    ))}
                </select>
                
                <button className="role-button" onClick={handleDeleteRole}>Delete Role</button>
            </div>
        </div>}
        </>
    );
};

export default TeamRoles;

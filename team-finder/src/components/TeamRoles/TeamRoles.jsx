import React, { useState, useEffect } from "react";
import api from "../../api/api";
import CircularIndeterminate from "../../auth-logic/loading";
import axios from "axios";

const TeamRoles = () => {
    const [auth, setAuth] = useState(false);
    const [newRoleName, setNewRoleName] = useState("");
    const [selectedEditRole, setSelectedEditRole] = useState("");
    const [allRoles, setAllRoles] = useState([]);
    const [editRoleName, setEditRoleName] = useState("");
    const [selectedDeleteRole, setSelectedDeleteRole] = useState("");
    const [deleteRoleName, setDeleteRoleName] = useState("");

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await api.get('api/user/me', { withCredentials: true });
                if (response.status === 200) {
                    setAuth(true);
                    // Fetch all roles for editing and deleting
                    const rolesResponse = await api.get('api/admin/get-team-roles', { withCredentials: true });
                    if (rolesResponse.status === 200) {
                        setAllRoles(rolesResponse.data.teamRoles);
                    }
                } else {
                    setAuth(false);
                }
            } catch (error) {
                console.log('se incarca info', error);
            }
        }
        fetchProfile();
    }, []);

    const handleCreateRole = async () => {
        try {
            const response = await api.post('api/admin/create-team-role', { name: newRoleName });
            if (response && response.status === 200) {
            console.log("Role created successfully!");
            setNewRoleName(""); // Clear the input after creation
            }
        } catch (error) {
            console.error("Error creating role:", error);
        }
    };

    const handleUpdateRole = async () => {
        try {
            const response = await api.put('api/admin/update-team-role', { oldName: selectedEditRole, newName: editRoleName },{withCredentials:true});
           
            if (response && response.status === 200) {
                console.log("Role updated successfully!");
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
                setSelectedDeleteRole("");
            } else {
                console.error("Failed to delete role:", response.data);
            }
        } catch (error) {
            console.error("Error deleting role:", error);
        }
      };
    
    
    

    return (
        <div>
            <h2>Team Roles</h2>
            <div>
                <input type="text" value={newRoleName} onChange={(e) => setNewRoleName(e.target.value)} />
                <button onClick={handleCreateRole}>Create Role</button>
            </div>
            <div>
                <select value={selectedEditRole} onChange={(e) => setSelectedEditRole(e.target.value)}>
                    <option value="">Select a role to edit</option>
                    {allRoles && allRoles.map(role => (
                        <option key={role.name} value={role.name}>{role.name}</option>
                    ))}
                </select>
                <input type="text" value={editRoleName} onChange={(e) => setEditRoleName(e.target.value)} />
                <button onClick={handleUpdateRole}>Edit Role</button>
            </div>
            <div>
                <select value={selectedDeleteRole} onChange={(e) => setSelectedDeleteRole(e.target.value)}>
                    <option value="">Select a role to delete</option>
                    {allRoles && allRoles.map(role => (
                        <option key={role.name} value={role.name}>{role.name}</option>
                    ))}
                </select>
                <button onClick={handleDeleteRole}>Delete Role</button>
            </div>
        </div>
    );
};

export default TeamRoles;

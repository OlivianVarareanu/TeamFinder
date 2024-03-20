import { useState, useEffect } from "react";
import { TextField, Button, Typography } from "@mui/material";
import "./index.css";
import api from "../../api/api"; 
import apiURL from "../../../apiURL"; 

export default function CreateSkills() {
    const [category, setCategory] = useState("");
    const [skillName, setSkillName] = useState("");
    const [skillDescription, setSkillDescription] = useState("");
    const [user, setUser] = useState(null); 

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await api.get(`${apiURL}/user/me`, {
                    withCredentials: true,
                });
                setUser(response.data);
            } catch (error) {
                console.log("Error fetching user data:", error);
            }
        };
        fetchProfile();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await api.post(`${apiURL}/skill/create-skill`, {
                skill: {
                    name: skillName,
                    description: skillDescription, 
                    category: { name: category }
                }
            });
            console.log(response);
            setCategory("");
            setSkillName("");
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="form-container">
            <Typography variant="h6" gutterBottom>
                Create Skills
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    sx={{ marginBottom: 16 }}
                    label="Category"
                    variant="outlined"
                    size="small"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                />
                <TextField
                    sx={{ marginBottom: 16 }}
                    label="Skill Name"
                    variant="outlined"
                    size="small"
                    value={skillName}
                    onChange={(e) => setSkillName(e.target.value)}
                    required
                />
                <TextField
                    sx={{ marginBottom: 16 }}
                    label="Description"
                    variant="outlined"
                    size="small"
                    value={skillDescription}
                    onChange={(e) => setSkillDescription(e.target.value)}
                    required
                />
                <Button
                    sx={{ width: 150, height: 50 }}
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth
                >
                    Create
                </Button>
            </form>
        </div>
    );
}

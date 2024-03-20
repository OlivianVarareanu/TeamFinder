import { useState, useEffect } from "react";
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress } from "@mui/material";
import api from "../../api/api";
import apiURL from "../../../apiURL";
import "./index.css";

export default function SkillList() {
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    
    useEffect(()=> {
        const fetchProfile = async () => {
            try {
                const response = await api.get(`${apiURL}/user/me`,{withCredentials:true});
                if(response.status===200)
                {
                    setAuth(true);
                }
                else {
                    setAuth(false);
                }
            }
            catch(error){
                console.log('se incarca info');
            }
            }
            fetchProfile();
        },[]);


    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const response = await api.get(`${apiURL}/user/my-skills`, {
                    withCredentials: true,
                });
                console.log("Skills data:", response.data);
                if (Array.isArray(response.data.skills)) {
                    setSkills(response.data.skills);
                    console.log(skills);
                } else {
                    console.log(response.data);
                    throw new Error("Skills data is not an array");
                    
                }
                setLoading(false);
            } catch (error) {
                console.log("Error fetching skills:", error);
                setError(error.message);
            }
        };
        fetchSkills();
    }, []);

    return (
        <div className="skill-list-container">
            <Typography variant="h5" gutterBottom>
                Skills
            </Typography>
            {loading ? (
                <CircularProgress />
            ) : error ? (
                <Typography variant="body1" color="error">
                    Error: {error}
                </Typography>
            ) : (
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Category</TableCell>
                                <TableCell>Skill Name</TableCell>
                                <TableCell>Description</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {skills.map((skill, index) => (
                                <TableRow key={index}>
                                    <TableCell>{skill.category}</TableCell>
                                    <TableCell>{skill.name}</TableCell>
                                    <TableCell>{skill.description}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </div>
    );
}

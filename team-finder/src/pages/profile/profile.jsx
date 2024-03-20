import React, { useState, useEffect } from "react";
import { Typography, TextField, Button } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Autocomplete from "@mui/material/Autocomplete";
import Slider from "@mui/material/Slider";
import CircularProgress from "@mui/material/CircularProgress";
import api from "../../api/api";
import apiURL from "../../../apiURL";
import profileIcon from "../../assets/profile-icon.png";
import CircularIndeterminate from "../../auth-logic/loading";

export default function Profile() {


  const experienceLevels = [
    "0-6 months",
    "6-12 months",
    "1-2 years",
    "2-4 years",
    "4-7 years",
    ">7 years",
  ];

  const levelLabels = ["Learns", "Knows", "Does", "Helps", "Teaches"];

  const [selectedSkill, setSelectedSkill] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(1);
  const [selectedExperience, setSelectedExperience] = useState(1);
  const [mySkills, setMySkills] = useState([]);
  const [skillOptions, setSkillOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
   const [filteredExperienceLevels, setFilteredExperienceLevels] = useState([]);
  const [filteredLevelLabels, setFilteredLevelLabels] = useState([])
  const [skills, setSkills] = useState([])

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get(`${apiURL}/user/me`, {
          withCredentials: true,
        });
        setUser(response.data.user);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setError("Error fetching profile");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    handleFetchSkills();
  }, []);

  const handleDeleteSkill = async (index) => {
    try {
      const skillIdToDelete = mySkills[index].skill._id;
      await api.delete(`${apiURL}/department/delete-skill`, {
        data: { skillId: skillIdToDelete }
      });

      const updatedSkills = [...mySkills];
      updatedSkills.splice(index, 1);
      setMySkills(updatedSkills);
    } catch (error) {
      console.error("Error deleting skill:", error);
      setError("Error deleting skill");
    }
  };
/////
  useEffect(() => {
    handleSkillsList();
  }, []);

  const handleSkillsList = async () => {
    try {
      const response = await api.get(`${apiURL}/skill/get-skills`);
      const skills = response.data.results;
      const skillNames = skills.map((skill) => skill.name);
      setSkillOptions(skillNames);
      setSkills(skills);
    } catch (error) {
      console.error("Error fetching skills:", error);
      setError("Error fetching skills");
    } finally {
      setIsLoading(false);
    }
  };
////
  const handleFetchSkills = async () => {
    try {
      const response = await api.get(`${apiURL}/user/my-skills`);
      setMySkills(response.data.skills);
      const skillNames = response.data.skills.map((skill) => skill.skillId.name);
      // setSkillOptions(skillNames);
    } catch (error) {
      console.error("Error fetching skills:", error);
      setError("Error fetching skills");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (_, newValue) => {
    setSelectedExperience(newValue);
  
  };

  const handleLevelChange = (_, newValue) => {
    setSelectedLevel(newValue);
    console.log(newValue);
  };

  const handleAddSkill = async () => {
    try {

      // Find the selected skill object from the options array
      const skillToAdd = selectedSkill;
      console.log(skills);
      console.log(skillToAdd);
      const newSkill = {
        _id: skills.find((skill) => skill.name === skillToAdd)._id,
        level: levelLabels[selectedLevel - 1],
        experience: experienceLevels[selectedExperience - 1],
      };
      

      // Send the selected skill ID to the server
      const response = await api.post(`${apiURL}/user/assign-skill`, {
        skill: {...newSkill},
      });

      // Add the new skill to the list
      

      // Add the new skill to the list of selected skills
      setMySkills([...mySkills, newSkill]);

      // Clear the selected skill
      setSelectedSkill(null);
    } catch (error) {
      console.error("Error adding skill:", error);
      setError("Error adding skill");
    }
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography variant="body1">{error}</Typography>;
  }

  if (!user) {
    return <CircularIndeterminate />;
  }
  return (
    <div className="LeftContainerProfile">
      <Avatar
        sx={{ width: 110, height: 110 }}
        className="ProfileAvatar"
        src={profileIcon}
      />
      <Typography className="UsernameProfile" variant="h4">
        {user.name}
      </Typography>
      <div className="GreenSmall" />
      <Typography className="UserAvaiability" variant="h6">
        Available
      </Typography>
      <Typography variant="h5" className="UserEmail">
        Email:
      </Typography>
      <Typography variant="h6" className="UserEmailExample">
        {user.email}
      </Typography>
      <Typography variant="h4">My Skills</Typography>
      <div className="MySkillsContainer">
        {mySkills.map((skill, index) => (
          <div key={index}>
            <Typography variant="body1">Skill: {skill.name}</Typography>
            <Typography variant="body1">Level: {skill.level}</Typography>
            <Typography variant="body1">
              Experience: {skill.experience}
            </Typography>
            {/* <Button
              sx={{ width: 80, height: 30 }}
              onClick={() => handleDeleteSkill(index)}
              className="DeleteSkillBtn"
              variant="contained"
            >
              Delete
            </Button> */}
            <Typography variant="body1">---------------------------</Typography>
          </div>
        ))}
      </div>

      <div className="RightPanel">
        <div className="SkillSection">
          <Typography variant="h6" className="SelectSkill">
            Select a Skill:
          </Typography>
          <Autocomplete
  disablePortal
  options={skillOptions}
  value={selectedSkill}
  onChange={(event, newValue) => setSelectedSkill(newValue)}
  sx={{ width: 300 }}
  renderInput={(params) => (
    <TextField {...params} label="Select a Skill" />
  )}
/>
        </div>
        <div className="SkillSection">
          <Typography variant="h6" className="SkillLevel">
            Select your level
          </Typography>
          <Slider
            className="SliderLevel"
            sx={{ width: 250, height: 5 }}
            aria-label="Small steps"
            value={selectedLevel}
            onChange={handleLevelChange}
            step={1}
            marks
            min={1}
            max={levelLabels.length}
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => levelLabels[value - 1]}
          />
        </div>
        <div className="SkillSection">
          <Typography variant="h6" className="Experience">
            Experience
          </Typography>
          <Slider
            className="SliderLevel"
            sx={{ width: 250, height: 5 }}
            aria-label="Small steps"
            value={selectedExperience}
            onChange={handleChange}
            step={1}
            marks
            min={1}
            max={experienceLevels.length}
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => experienceLevels[value - 1]}
          />
          <Button
          sx={{ width: 120, height: 35 }}
          onClick={handleAddSkill}
          className="AddSkillBtn"
          variant="contained"
        >
          Add Skill
        </Button>
        </div>
      </div>
    </div>
  );
}
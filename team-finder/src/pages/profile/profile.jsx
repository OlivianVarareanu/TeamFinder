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
  const skillCategories = [
    "Programming Languages",
    "Framework",
    "Library",
    "Back End",
    "Front End",
    "Software Engineering",
    "AI",
    "DevOps",
  ];

  const experienceLevels = [
    "0-6 months",
    "6-12 months",
    "1-2 years",
    "2-4 years",
    "4-7 years",
    ">7 years",
  ];

  const levelLabels = ["Learns", "Knows", "Does", "Helps", "Teaches"];

  const [skillCategory, setSkillCategory] = useState("");
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(1);
  const [selectedExperience, setSelectedExperience] = useState(1);
  const [mySkills, setMySkills] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get(`${apiURL}/user/me`, {
          withCredentials: true,
        });
        setUser(response.data.user);
      } catch (error) {
        console.log(error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleFetchSkills = async () => {
    try {
      const response = await api.get(`${apiURL}/user/my-skills`);
      setMySkills(response.data.skills);
    } catch (error) {
      console.log(error);
      setError("Error fetching skills");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (event, newValue) => {
    setSelectedExperience(newValue);
  };
  
  const handleLevelChange = (event, newValue) => {
    setSelectedLevel(newValue);
  };

  useEffect(() => {
    handleFetchSkills();
  }, []);

  const handleDeleteSkill = (index) => {
    const updatedSkills = [...mySkills];
    updatedSkills.splice(index, 1);
    setMySkills(updatedSkills);
  };

  const handleAddSkill = async () => {
    if (selectedSkill) {
      try {
        const response = await api.post(`${apiURL}/user/assign-skill`, {
          skill: {
            level: selectedLevel,
            experience: selectedExperience,
            _id: selectedSkill,
          },
        });
        const newSkill = {
          skill: selectedSkill,
          level: selectedLevel,
          experience: selectedExperience,
        };
        setMySkills([...mySkills, newSkill]);
      } catch (error) {
        console.log("Error adding skill:", error);
        setError("Error adding skill");
      }
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
            <Typography variant="body1">Skill: {skill.skillId.name}</Typography>
            <Typography variant="body1">Level: {skill.level}</Typography>
            <Typography variant="body1">
              Experience: {skill.experience}
            </Typography>
            <Button
              sx={{ width: 80, height: 30 }}
              onClick={() => handleDeleteSkill(index)}
              className="DeleteSkillBtn"
              variant="contained"
            >
              Delete
            </Button>
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
            className="CatCombo"
            options={skillCategories}
            value={skillCategory}
            onChange={(event, newValue) => setSkillCategory(newValue)}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label="SkillCategory" />
            )}
          />
          {skillCategory && (
            <Autocomplete
              disablePortal
              className="SkillCombo"
              options={SkillLists[skillCategory]}
              value={selectedSkill}
              onChange={(event, newValue) => setSelectedSkill(newValue)}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="SkillList" />
              )}
            />
          )}
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
            onChange={(_, newValue) => setSelectedLevel(newValue)}
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

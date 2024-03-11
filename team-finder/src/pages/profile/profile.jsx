import Navbar from "../../components/Navbar/Navbar";
import "./profile.css";
import api from "../../api/api";

import React, { useState ,useEffect} from "react";
import { Typography, TextField, Button } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import profileIcon from "../../assets/profile-icon.png";
import Autocomplete from "@mui/material/Autocomplete";
import Slider from "@mui/material/Slider";
import "./profile.css";
import CircularIndeterminate from "../../auth-logic/loading";

export default function Profile() {
  const SkillCategory = [
    "Programming Languages",
    "Framework",
    "Library",
    "Back End",
    "Front End",
    "Software Engineering",
    "AI",
    "DevOps",
  ];

  const SkillLists = {
    "Programming Languages": [
      "C++",
      "C",
      "Javascript",
      "Python",
      "Rub",
      "Swift",
      "C#",
      "Java",
      "Python",
    ],
    Framework: [
      "React.js",
      "Angular",
      "Vue.js",
      "Django",
      "Flask",
      "Spring Boot",
      "Express.js",
      "Ruby on Rails",
      "Laravel",
      ".NET Core",
    ],
    Library: [
      "jQuery",
      "Axios",
      "Redux",
      "Axios",
      "Lodash",
      "Moment.js",
      "React Router",
      "TensorFlow.js",
      "Pandas",
      "NumPy",
      "UiMaterial",
    ],
    "Back End": [
      "Node.js",
      "Express.js",
      "Django",
      "Flask",
      "Spring Boot",
      "Ruby on Rails",
      "Laravel",
      "ASP.NET Core",
      "GraphQL",
      "RESTful APIs",
    ],
    "Front End": [
      "HTML",
      "CSS",
      "JavaScript",
      "React.js",
      "Angular",
      "Vue.js",
      "Sass",
      "Bootstrap",
      "Tailwind CSS",
      "Responsive Design",
    ],
    "Software Engineering": [
      "Agile",
      "Scrum",
      "Kanban",
      "Test-Driven Development (TDD)",
      "Continuous Integration (CI)",
      "Continuous Deployment (CD)",
      "Design Patterns",
      "Refactoring",
      "Code Reviews",
      "Documentation",
    ],
    AI: [
      "Machine Learning",
      "Deep Learning",
      "Neural Networks",
      "Natural Language Processing (NLP)",
      "Computer Vision",
      "Reinforcement Learning",
      "Genetic Algorithms",
      "Expert Systems",
      "Decision Trees",
      "Bayesian Networks",
    ],
    DevOps: [
      "Docker",
      "Kubernetes",
      "Jenkins",
      "Ansible",
      "Terraform",
      "Vagrant",
      "Prometheus",
      "Grafana",
      "ELK Stack (Elasticsearch, Logstash, Kibana)",
      "GitOps",
    ],
  };

  const [skillCategory, setSkillCategory] = useState("");
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(1);
  const [selectedExperience, setSelectedExperience] = useState(1);
  const [mySkills, setMySkills] = useState([]);

  const handleAddSkill = () => {
    if (selectedSkill) {
      const newSkill = {
        skillCat: skillCategory,
        skill: selectedSkill,
        level: selectedLevel,
        experience: selectedExperience,
      };
      console.log("New skill:", newSkill);
      setMySkills([...mySkills, newSkill]);
    }
  };

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("api/user/me", {
          withCredentials: true,
        });
        setUser(response.data);
      } catch (error) {
        console.log("se incarca info");
      }
    };
    fetchProfile();
  }, []);

  if (!user) {
    return CircularIndeterminate();
  }

  return (
    <div className="LeftContainerProfile">
      <Avatar
        sx={{ width: 110, height: 110 }}
        className="ProfileAvatar"
        src={profileIcon}
      ></Avatar>
      <Typography className="UsernameProfile" variant="h4">
        Username
      </Typography>
      <div className="GreenSmall"></div>
      <Typography className="UserAvaiability" variant="h6">
        Available
      </Typography>
      <Typography variant="h5" className="UserEmail">
        Email:
      </Typography>
      <Typography variant="h6" className="UserEmailExample">
        Email@Example.com
      </Typography>
      <Typography variant="h4" className="UserSkills">
        My Skills
      </Typography>
      <div className="MySkillsContainer">
        {mySkills.map((skill, index) => (
          <div key={index}>
            <Typography variant="body1">Category: {skill.skillCat}</Typography>
            <Typography variant="body1">Skill: {skill.skill}</Typography>
            <Typography variant="body1">Level: {skill.level}</Typography>
            <Typography variant="body1">
              Experience: {skill.experience}
            </Typography>
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
            options={SkillCategory}
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
            onChange={(event, newValue) => setSelectedLevel(newValue)}
            step={1}
            marks
            min={1}
            max={10}
            valueLabelDisplay="auto"
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
            onChange={(event, newValue) => setSelectedExperience(newValue)}
            step={1}
            marks
            min={1}
            max={10}
            valueLabelDisplay="auto"
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

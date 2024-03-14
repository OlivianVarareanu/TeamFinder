import { useState, useEffect } from 'react';
import CircularIndeterminate from '../../../auth-logic/loading';
import api from '../../../api/api';
import './index.css';

export default function UpdateDepartment() {
  const [auth, setAuth] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("api/user/me", {
          withCredentials: true,
        });
        if (response.status === 200) {
          setAuth(true);

        } else {
          setAuth(false);
        }
      } catch (error) {
        console.log("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await api.get('/api/organization/get-departments', { withCredentials: true });
        console.log("raspuns ===:", response); // Add this line for logging
        if (response && response.status === 200) {
          setDepartments(response.data.departments);
        } else {
          setError(response.statusText);
        }
      } catch (error) {
        console.error("Error fetching departments:", error);
        setError("Error fetching departments. Please try again later.");
      }
    };

    fetchDepartments(); 
  }, []);

  if (!auth) {
    return CircularIndeterminate();
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <table className="UpdateTable">
        <thead>
          <tr>
            <th>Name</th>
            {/* Add more table headers as needed */}
          </tr>
        </thead>
        <tbody>
          {departments.map((department, index) => (
            <tr key={index}>
              <td>{department.name}</td>
              {/* Add more table cells to display additional department data */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

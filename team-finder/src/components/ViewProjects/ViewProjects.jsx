import React, { useState, useEffect } from "react";
import api from "../../api/api";
import CircularIndeterminate from "../../auth-logic/loading";
import apiURL from "../../../apiURL";
import "./ViewProjects.css";

export default function ViewProjects() {
  const [auth, setAuth] = useState(false);
  const [allProjects, setAllProjects] = useState([]); // Lista completă de proiecte
  const [filteredProjects, setFilteredProjects] = useState([]); // Lista de proiecte filtrate
  const ITEMS_PER_PAGE = 20;
  const [pagination, setPagination] = useState({
    totalRecords: 0,
    currentPage: 1,
    totalPages: 1
  });
  const [projectPeriodFilter, setProjectPeriodFilter] = useState('');
  const [projectStatusFilter, setProjectStatusFilter] = useState('');
  const [selectedProjectId, setSelectedProjectId] = useState(null); // ID-ul proiectului selectat pentru ștergere

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get(`${apiURL}/user/created-projects`, { withCredentials: true });
        if (response.data.success) {
          setAllProjects(response.data.projects);
          setFilteredProjects(response.data.projects);
          setPagination({
            totalRecords: response.data.pagination.totalRecords,
            currentPage: response.data.pagination.currentPage,
            totalPages: Math.ceil(response.data.pagination.totalRecords / ITEMS_PER_PAGE)
          });
          setAuth(true);
        } else {
          setAuth(false);
        }
      } catch (error) {
        console.log("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  const applyFilters = () => {
    let filtered = allProjects;
    if (projectPeriodFilter !== '') {
      filtered = filtered.filter(project => project.projectPeriod === projectPeriodFilter);
    }
    if (projectStatusFilter !== '') {
      filtered = filtered.filter(project => project.projectStatus === projectStatusFilter);
    }
    setFilteredProjects(filtered);
    setPagination({
      ...pagination,
      currentPage: 1, // Resetează pagina curentă la prima pagină atunci când se aplică filtre
      totalPages: Math.ceil(filtered.length / ITEMS_PER_PAGE) // Recalculăm numărul total de pagini
    });
  };

  const handlePreviousPage = () => {
    if (pagination.currentPage > 1) {
      const newPage = pagination.currentPage - 1;
      setPagination({ ...pagination, currentPage: newPage });
      const startIndex = (newPage ) * ITEMS_PER_PAGE;
      const endIndex = newPage+1 * ITEMS_PER_PAGE;
      setFilteredProjects(allProjects.slice(startIndex, endIndex));
    }
  };
  
  const handleNextPage = () => {
    if (pagination.currentPage < pagination.totalPages) {
      const newPage = pagination.currentPage + 1;
      setPagination({ ...pagination, currentPage: newPage });
      const startIndex = newPage  * ITEMS_PER_PAGE;
      const endIndex = newPage+1 * ITEMS_PER_PAGE;
      setFilteredProjects(allProjects.slice(startIndex, endIndex));
    }
  };

  const handleDeleteConfirmation = (projectId) => {
    setSelectedProjectId(projectId);
  };

  const handleDeleteProject = async () => {
    try {
      const response = await api.delete(`${apiURL}/project/delete-project/${selectedProjectId}`, { withCredentials: true });
      if (response.data.success) {
        // Actualizăm lista de proiecte filtrate după ștergerea proiectului
        const updatedProjects = filteredProjects.filter(project => project._id !== selectedProjectId);
        setFilteredProjects(updatedProjects);
  
        // Actualizăm paginarea dacă numărul total de proiecte a fost afectat
        setPagination({
          ...pagination,
          totalRecords: pagination.totalRecords - 1,
          totalPages: Math.ceil((pagination.totalRecords - 1) / ITEMS_PER_PAGE)
        });
  
        console.log("Project deleted successfully!");
      } else {
        console.log("Error deleting project:", response.data.message);
      }
    } catch (error) {
      console.log("Error deleting project:", error);
    } finally {
      setSelectedProjectId(null); // Resetăm ID-ul proiectului selectat pentru ștergere
    }
  };

  if (!auth) {
    return <CircularIndeterminate />;
  }

  return (
    <div>
      {/* Filtrare după perioada proiectului */}
      <div>
        <label>Project Period:</label>
        <select value={projectPeriodFilter} onChange={(e) => setProjectPeriodFilter(e.target.value)}>
          <option value="">All</option>
          <option value="Ongoing">Ongoing</option>
          <option value="Fixed">Fixed</option>
        </select>
      </div>
      
      {/* Filtrare după starea proiectului */}
      <div>
        <label>Project Status:</label>
        <select value={projectStatusFilter} onChange={(e) => setProjectStatusFilter(e.target.value)}>
          <option value="">All</option>
          <option value="Not Started">Not Started</option>
          <option value="Starting">Starting</option>
          {/* Adaugă alte opțiuni de status, dacă este cazul */}
        </select>
      </div>

      {/* Butonul de aplicare a filtrelor */}
      <button onClick={applyFilters}>Apply</button>

      {/* Tabelul cu proiectele filtrate */}
      <table>
        <thead>
          <tr>
            <th>Project Name</th>
            <th>Project Period</th>
            <th>Project Status</th>
            <th>Actions</th> {/* Adăugăm o coloană pentru acțiuni */}
          </tr>
        </thead>

        <tbody>
          {filteredProjects
            .slice((pagination.currentPage - 1) * ITEMS_PER_PAGE, pagination.currentPage * ITEMS_PER_PAGE)
            .map((project) => (
              <tr key={project._id}>
                <td>{project.projectName}</td>
                <td>{project.projectPeriod}</td>
                <td>{project.projectStatus}</td>
                <td>
                  <button className="delete-project" onClick={() => handleDeleteConfirmation(project._id)}>Delete</button>
                </td>
              </tr>
          ))}
        </tbody>
      </table>

      {/* Mesajul de confirmare pentru ștergerea proiectului */}
      {selectedProjectId && (
        <div className={`confirmation-modal ${selectedProjectId !== null ? 'active' : ''}`}>
        <p>Are you sure you want to delete this project?</p>
        <div className="buttons-wrapper">
          <button className="blue-button" onClick={handleDeleteProject}>Yes</button>
          <button className="blue-button" onClick={() => setSelectedProjectId(null)}>No</button>
        </div>
      </div>
      )}

      {/* Gestionare paginare */}
      {filteredProjects.length > 0 && (
        <div className="buttons-wrapper">
          <button className="blue-button" onClick={handlePreviousPage} disabled={pagination.currentPage === 1}>
            Previous Page
          </button>
          <button className="blue-button" onClick={handleNextPage} disabled={pagination.currentPage === pagination.totalPages}>
            Next Page
          </button>
        </div>
      )}
    </div>
  );
}

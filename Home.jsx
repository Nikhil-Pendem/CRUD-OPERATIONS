import React, { useContext } from 'react';
import { ProjectContext } from '../context/ProjectContext';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const { projects, setProjects } = useContext(ProjectContext);

  const deleteProject = async (id) => {
    if (!confirm('Delete this project?')) return;
    try {
      await axios.delete(`http://localhost:5000/projects/${id}`);
      setProjects(projects.filter(project => project.id !== id));
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  return (
    <div>
      <h2>Projects</h2>
      <Link to="/add">Add Project</Link>
      <ul>
        {projects.map(p => (
          <li key={p.id}>
            <strong>{p.title}</strong>: {p.description}
            <div>
              <Link to={`/edit/${p.id}`}>Edit</Link>
              <button onClick={() => deleteProject(p.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
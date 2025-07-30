import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ProjectContext } from '../context/ProjectContext';

const AddProject = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { fetchProjects } = useContext(ProjectContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description) return alert('Fill all fields');
    try {
      await axios.post('http://localhost:5000/projects', { title, description });
      fetchProjects();
      navigate('/');
    } catch (err) {
      console.error('Add failed:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
      <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
      <button type="submit">Add</button>
    </form>
  );
};

export default AddProject;
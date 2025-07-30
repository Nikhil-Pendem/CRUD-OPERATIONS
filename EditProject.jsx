import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { ProjectContext } from '../context/ProjectContext';

const EditProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchProjects } = useContext(ProjectContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:5000/projects/${id}`).then(res => {
      setTitle(res.data.title);
      setDescription(res.data.description);
    }).catch(err => console.error('Load failed:', err));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description) return alert('Fill all fields');
    try {
      await axios.put(`http://localhost:5000/projects/${id}`, { title, description });
      fetchProjects();
      navigate('/');
    } catch (err) {
      console.error('Update failed:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={title} onChange={e => setTitle(e.target.value)} />
      <textarea value={description} onChange={e => setDescription(e.target.value)} />
      <button type="submit">Update</button>
    </form>
  );
};

export default EditProject;
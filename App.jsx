import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AddProject from './pages/AddProject';
import EditProject from './pages/EditProject';
import { ProjectProvider } from './context/ProjectContext';

function App() {
  return (
    <ProjectProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddProject />} />
          <Route path="/edit/:id" element={<EditProject />} />
        </Routes>
      </BrowserRouter>
    </ProjectProvider>
  );
}

export default App;
// In your App.js
import React from 'react';


import StudentPortal from './Pages/Student.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UniversityPortal from './Pages/Home.jsx';
import FacultyPortal from './Pages/Faculty.jsx';
import AdministratorPortal from './Pages/Admin.jsx';

function App() {
  return (
    <Router>
    
        <Routes>
          <Route path="/" element={<UniversityPortal />} />
          <Route path="/faculty-portal" element={<FacultyPortal />} />
          <Route path="/student-portal" element={<StudentPortal />} />
          <Route path="/admin-portal" element={<AdministratorPortal />} />
        </Routes>
    
    </Router>
  );
}

export default App;
import React, { useState } from 'react';
import { FaUserGraduate, FaChalkboardTeacher, FaUserCog, FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const UniversityPortal = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const navigate = useNavigate();

  const roles = [
    {
      id: 'student',
      title: 'Student',
      description: 'Access your courses, assignments, grades, and learning resources',
      icon: <FaUserGraduate className="text-4xl mb-4 text-blue-600" />,
      color: 'bg-blue-100',
      hoverColor: 'hover:bg-blue-200',
      textColor: 'text-blue-700',
      route: '/student-portal'
    },
    {
      id: 'professor',
      title: 'Professor',
      description: 'Manage your courses, track attendance, grade assignments, and schedule lectures',
      icon: <FaChalkboardTeacher className="text-4xl mb-4 text-green-600" />,
      color: 'bg-green-100',
      hoverColor: 'hover:bg-green-200',
      textColor: 'text-green-700',
      route: '/faculty-portal'
    },
    {
      id: 'admin',
      title: 'Administrator',
      description: 'Manage system settings, user accounts, and institutional resources',
      icon: <FaUserCog className="text-4xl mb-4 text-purple-600" />,
      color: 'bg-purple-100',
      hoverColor: 'hover:bg-purple-200',
      textColor: 'text-purple-700',
      route: '/admin-portal'
    }
  ];

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    // In a real app, you would navigate to the respective portal
    console.log(`Navigating to: ${role.route}`);
    // Example: navigate(role.route);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800">
      {/* Header */}
      <header className="py-6 px-4 sm:px-8 flex justify-between items-center bg-white shadow-sm">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-3">
            <span className="text-white font-bold text-xl">Ut</span>
          </div>
          <h1 className="text-2xl font-bold text-blue-800">Utopia</h1>
        </div>
        <nav className="hidden md:flex space-x-6">
          <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Home</a>
          <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">About</a>
          <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Contact</a>
          <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Help</a>
        </nav>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
          Login
        </button>
      </header>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Welcome to Utopia </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Select your role to access the dedicated portal with tools and resources tailored to your needs
          </p>
        </div>

        {/* Role Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {roles.map((role) => (
            <div 
              key={role.id}
              className={`bg-white rounded-xl p-8 transition-all duration-300 transform hover:scale-105 cursor-pointer border-2 ${selectedRole === role.id ? 'border-blue-500 shadow-xl' : 'border-transparent shadow-md'}`}
              onClick={() => handleRoleSelect(role)}
              onMouseEnter={() => setHoveredCard(role.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="flex flex-col items-center text-center">
                {role.icon}
                <h3 className="text-2xl font-bold mb-3 text-gray-900">{role.title}</h3>
                <p className="text-gray-600 mb-6">{role.description}</p>
                <div className={`w-full h-12 rounded-lg flex items-center justify-center ${role.color} ${role.hoverColor} ${role.textColor} font-medium transition-colors`} onClick={() => navigate(role.route)}>
                  {selectedRole === role.id ? (
                    <span className="flex items-center">
                      Enter Portal <FaArrowRight className="ml-2" />
                    </span>
                  ) : hoveredCard === role.id ? (
                    <span>Select Role</span>
                  ) : (
                    <span>Learn More</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="max-w-4xl mx-auto mt-20 text-center">
          <h3 className="text-2xl font-bold mb-6 text-gray-900">Need Help Selecting?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="font-bold text-lg mb-2 text-blue-600">Students</h4>
              <p className="text-gray-600">Access courses, submit assignments, view grades, and connect with peers.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="font-bold text-lg mb-2 text-green-600">Faculty</h4>
              <p className="text-gray-600">Manage courses, track attendance, grade submissions, and schedule classes.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="font-bold text-lg mb-2 text-purple-600">Administrators</h4>
              <p className="text-gray-600">Oversee system operations, manage users, and access institutional reports.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white mt-20 py-10 px-4 shadow-inner">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h4 className="font-bold text-lg mb-4 text-gray-900">University Portal</h4>
            <p className="text-gray-600">Providing access to education resources for students, faculty and staff.</p>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4 text-gray-900">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Home</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">About</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Contact</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Help Center</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4 text-gray-900">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Library</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Research</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Calendar</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Documents</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4 text-gray-900">Contact Us</h4>
            <address className="text-gray-600 not-italic">
              <p>123 University Avenue</p>
              <p>College Town, CT 06452</p>
              <p className="mt-2">Email: info@university.edu</p>
              <p>Phone: (123) 456-7890</p>
            </address>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-gray-200 text-center text-gray-600">
          <p>© 2023 University Portal. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default UniversityPortal;
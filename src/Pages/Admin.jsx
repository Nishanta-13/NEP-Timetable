import React, { useState, useEffect } from 'react';
import ProfessorView from '../Components/Admin/Admin.proff';
import TimetableView from '../Components/Admin/Admin.timetable';
import StudentView from '../Components/Admin/Admin.Student';
import AdminSidebar from '../Components/Admin/Admin.Sidebar';

const AdministratorPortal = () => {
  const [activeView, setActiveView] = useState('timetable');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen and auto-collapse sidebar
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth < 1024) {
        setSidebarCollapsed(true);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const adminData = {
    name: "Dr. Sarah Johnson",
    role: "System Administrator",
    department: "IT Administration",
    
    // Timetable data
    timetables: [
      { 
        id: 1, 
        name: "Fall 2024 Semester", 
        status: "Active", 
        generatedDate: "2024-08-15", 
        frozen: false,
        description: "Main timetable for Fall 2024 semester"
      },
      { 
        id: 2, 
        name: "Spring 2024 Semester", 
        status: "Archived", 
        generatedDate: "2024-01-10", 
        frozen: true,
        description: "Previous semester timetable"
      },
      { 
        id: 3, 
        name: "Summer 2024", 
        status: "Draft", 
        generatedDate: "2024-05-20", 
        frozen: false,
        description: "Summer session timetable"
      }
    ],
    
    // Student data
    students: [
      { id: 1, name: "John Smith", email: "john.smith@student.edu", department: "Computer Science", year: "3rd", status: "Active", gpa: 3.8 },
      { id: 2, name: "Emma Wilson", email: "emma.wilson@student.edu", department: "Mathematics", year: "2nd", status: "Active", gpa: 3.9 },
      { id: 3, name: "Michael Brown", email: "michael.brown@student.edu", department: "Physics", year: "4th", status: "Active", gpa: 3.6 },
      { id: 4, name: "Sarah Davis", email: "sarah.davis@student.edu", department: "Engineering", year: "1st", status: "Inactive", gpa: 3.2 },
      { id: 5, name: "David Johnson", email: "david.johnson@student.edu", department: "Business", year: "3rd", status: "Active", gpa: 3.7 }
    ],
    
    // Professor data
    professors: [
      { id: 1, name: "Dr. Robert Chen", email: "r.chen@university.edu", department: "Computer Science", courses: 4, status: "Active", office: "Tech Building 301" },
      { id: 2, name: "Dr. Maria Garcia", email: "m.garcia@university.edu", department: "Mathematics", courses: 3, status: "Active", office: "Science Hall 205" },
      { id: 3, name: "Prof. James Wilson", email: "j.wilson@university.edu", department: "Physics", courses: 2, status: "On Leave", office: "Physics Building 102" },
      { id: 4, name: "Dr. Lisa Thompson", email: "l.thompson@university.edu", department: "Engineering", courses: 5, status: "Active", office: "Engineering Block 410" }
    ]
  };

  // Handle view change with mobile consideration
  const handleViewChange = (view) => {
    setActiveView(view);
    // Auto-close sidebar on mobile after selection
    if (isMobile) {
      setSidebarCollapsed(true);
    }
  };

  // Render different views based on activeView state
  const renderActiveView = () => {
    switch(activeView) {
      case 'timetable':
        return <TimetableView timetables={adminData.timetables} />;
      case 'student':
        return <StudentView students={adminData.students} />;
      case 'professor':
        return <ProfessorView professors={adminData.professors} />;
      default:
        return <TimetableView timetables={adminData.timetables} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`
        ${sidebarCollapsed ? 'w-0 lg:w-20' : 'w-64'} 
        transition-all duration-300 ease-in-out
        flex-shrink-0
      `}>
        <AdminSidebar 
          isCollapsed={sidebarCollapsed} 
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
          activeView={activeView}
          setActiveView={handleViewChange}
        />
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Header */}
        <AdminHeader 
          adminData={adminData} 
          onMenuToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
          isSidebarCollapsed={sidebarCollapsed}
        />
        
        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {renderActiveView()}
        </main>
      </div>
    </div>
  );
};

// Admin Header Component
const AdminHeader = ({ adminData, onMenuToggle, isSidebarCollapsed }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  return (
    <header className="bg-white shadow-md py-4 px-4 lg:px-6 flex items-center justify-between">
      {/* Left Section - Menu Button and Search */}
      <div className="flex items-center flex-1 max-w-3xl">
        {/* Mobile Menu Button */}
        <button 
          onClick={onMenuToggle}
          className="lg:hidden p-2 rounded-lg mr-3 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <i className={`fas ${isSidebarCollapsed ? 'fa-bars' : 'fa-times'} text-gray-600 text-lg`}></i>
        </button>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex-1">
          <div className="relative max-w-lg">
            <input
              type="text"
              placeholder="Search timetables, students, professors..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-sm lg:text-base"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i className="fas fa-search text-gray-400"></i>
            </div>
          </div>
        </form>
      </div>

      {/* Right Section with Icons */}
      <div className="flex items-center space-x-3 lg:space-x-4">
        {/* Notification Bell */}
        <div className="relative">
          <button className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors">
            <i className="fas fa-bell text-gray-600 text-lg"></i>
            <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-500"></span>
          </button>
        </div>

        {/* Profile Dropdown */}
        <div className="relative">
          <button 
            className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full p-1"
            onClick={() => setIsProfileOpen(!isProfileOpen)}
          >
            <div className="h-8 w-8 lg:h-10 lg:w-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
              <span className="text-white font-semibold text-sm lg:text-base">
                {adminData.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium text-gray-800">{adminData.name}</p>
              <p className="text-xs text-gray-500">{adminData.role}</p>
            </div>
            <i className={`fas fa-chevron-down text-gray-500 text-sm ${isProfileOpen ? 'transform rotate-180' : ''}`}></i>
          </button>

          {/* Dropdown Menu */}
          {isProfileOpen && (
            <>
              {/* Overlay */}
              <div 
                className="fixed inset-0 z-40"
                onClick={() => setIsProfileOpen(false)}
              />
              
              {/* Dropdown Content */}
              <div className="absolute right-0 mt-2 w-48 lg:w-56 bg-white rounded-lg shadow-lg py-2 z-50 border border-gray-200">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-800">{adminData.name}</p>
                  <p className="text-xs text-gray-500">{adminData.role}</p>
                  <p className="text-xs text-gray-400">{adminData.department}</p>
                </div>
                <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                  <i className="fas fa-user mr-3 text-gray-400"></i>
                  Admin Profile
                </a>
                <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                  <i className="fas fa-cog mr-3 text-gray-400"></i>
                  System Settings
                </a>
                <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                  <i className="fas fa-clipboard-list mr-3 text-gray-400"></i>
                  Audit Logs
                </a>
                <div className="border-t border-gray-100 my-1"></div>
                <a href="#" className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition-colors">
                  <i className="fas fa-sign-out-alt mr-3"></i>
                  Sign out
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default AdministratorPortal;
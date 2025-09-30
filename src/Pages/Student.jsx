import React, { useState, useEffect } from 'react';

const StudentPortal = () => {
  const [activeView, setActiveView] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      // On mobile, sidebar should be collapsed but still visible as icon bar
      if (mobile) {
        setSidebarCollapsed(true);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Sample data - in a real app this would come from an API
  const studentData = {
    name: "Emily Johnson",
    id: "S12345678",
    major: "Computer Science",
    semester: "Fall 2023",
    courses: [
      { id: "CS101", name: "Introduction to Programming", instructor: "Dr. Smith", credits: 3, grade: "A-" },
      { id: "MATH202", name: "Calculus II", instructor: "Prof. Davis", credits: 4, grade: "B+" },
      { id: "PHYS150", name: "Physics I", instructor: "Dr. Wilson", credits: 4, grade: "A" },
      { id: "ENG101", name: "Composition I", instructor: "Prof. Miller", credits: 3, grade: "A-" },
      { id: "HIST110", name: "World History", instructor: "Dr. Anderson", credits: 3, grade: "B" }
    ],
    timetable: [
      { 
        day: "Monday", 
        classes: [
          { id: "mon-cs101", text: "CS101 (9:00-10:15)", course: "CS101", time: "9:00-10:15", location: "Tech Building 202" },
          { id: "mon-math202", text: "MATH202 (1:30-2:45)", course: "MATH202", time: "1:30-2:45", location: "Science Hall 105" }
        ]
      },
      { 
        day: "Tuesday", 
        classes: [
          { id: "tue-phys150", text: "PHYS150 (10:30-11:45)", course: "PHYS150", time: "10:30-11:45", location: "Physics Lab 3" }
        ]
      },
      { 
        day: "Wednesday", 
        classes: [
          { id: "wed-cs101", text: "CS101 (9:00-10:15)", course: "CS101", time: "9:00-10:15", location: "Tech Building 202" },
          { id: "wed-eng101", text: "ENG101 (1:30-2:45)", course: "ENG101", time: "1:30-2:45", location: "Humanities 307" }
        ]
      },
      { 
        day: "Thursday", 
        classes: [
          { id: "thu-phys150", text: "PHYS150 (10:30-11:45)", course: "PHYS150", time: "10:30-11:45", location: "Physics Lab 3" }
        ]
      },
      { 
        day: "Friday", 
        classes: [
          { id: "fri-hist110", text: "HIST110 (11:00-12:15)", course: "HIST110", time: "11:00-12:15", location: "History Building 104" }
        ]
      }
    ],
    attendance: {
      CS101: { present: 22, absent: 2, percentage: 92 },
      MATH202: { present: 20, absent: 1, percentage: 95 },
      PHYS150: { present: 24, absent: 0, percentage: 100 },
      ENG101: { present: 21, absent: 3, percentage: 88 },
      HIST110: { present: 19, absent: 4, percentage: 83 }
    },
    coursePlan: [
      { semester: "Fall 2023", courses: ["CS101", "MATH202", "PHYS150", "ENG101", "HIST110"], status: "In Progress" },
      { semester: "Spring 2024", courses: ["CS102", "MATH203", "PHYS151", "ENG102", "ELECTIVE1"], status: "Planned" },
      { semester: "Fall 2024", courses: ["CS201", "MATH204", "PHYS250", "ELECTIVE2", "ELECTIVE3"], status: "Planned" },
      { semester: "Spring 2025", courses: ["CS202", "CSELECTIVE1", "CSELECTIVE2", "ELECTIVE4", "ELECTIVE5"], status: "Planned" }
    ]
  };

  // Get today's day name
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });

  // Filter data based on search query
  const filterData = (data, query) => {
    if (!query) return data;
    
    const lowerQuery = query.toLowerCase();
    
    if (Array.isArray(data)) {
      return data.filter(item => 
        Object.values(item).some(value => 
          String(value).toLowerCase().includes(lowerQuery)
        )
      );
    }
    
    return data;
  };

  // Filtered data based on search
  const filteredCourses = filterData(studentData.courses, searchQuery);
  const filteredTimetable = filterData(studentData.timetable, searchQuery);
  const filteredCoursePlan = filterData(studentData.coursePlan, searchQuery);

  // Handle view change with mobile consideration
  const handleViewChange = (view) => {
    setActiveView(view);
    // On mobile, keep sidebar collapsed after selection for better UX
    if (isMobile) {
      // Don't auto-collapse on mobile - keep it as icon bar
    }
  };

  // Render different views based on activeView state
  const renderActiveView = () => {
    switch(activeView) {
      case 'dashboard':
        return <DashboardView studentData={studentData} searchQuery={searchQuery} />;
      case 'schedule':
        return <ScheduleView timetable={filteredTimetable} today={today} searchQuery={searchQuery} />;
      case 'enrolled-courses':
        return <EnrolledCoursesView courses={filteredCourses} searchQuery={searchQuery} />;
      case 'course-plan':
        return <CoursePlanView coursePlan={filteredCoursePlan} searchQuery={searchQuery} />;
      case 'attendance':
        return <AttendanceView attendance={studentData.attendance} searchQuery={searchQuery} />;
      default:
        return <DashboardView studentData={studentData} searchQuery={searchQuery} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar - Always visible but collapsed on mobile */}
      <div className={`
        ${sidebarCollapsed ? 'w-16 lg:w-20' : 'w-64'} 
        transition-all duration-300 ease-in-out
        flex-shrink-0
        z-30
      `}>
        <StudentSidebar 
          isCollapsed={sidebarCollapsed} 
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
          activeView={activeView}
          setActiveView={handleViewChange}
          isMobile={isMobile}
        />
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Header */}
        <StudentHeader 
          studentData={studentData} 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery}
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

// Student Sidebar Component
const StudentSidebar = ({ isCollapsed, onToggle, activeView, setActiveView, isMobile }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'fa-th-large' },
    { id: 'schedule', label: 'Schedule', icon: 'fa-calendar-alt' },
    { id: 'enrolled-courses', label: 'My Courses', icon: 'fa-book' },
    { id: 'course-plan', label: 'Course Plan', icon: 'fa-road' },
    { id: 'attendance', label: 'Attendance', icon: 'fa-user-check' },
  ];

  const handleItemClick = (itemId) => {
    setActiveView(itemId);
    // On mobile, keep sidebar collapsed after selection for better UX
    if (isMobile) {
      // Don't auto-collapse on mobile - keep it as icon bar
    }
  };

  return (
    <div className={`
      bg-gray-900 text-white h-full flex flex-col transition-all duration-300
      ${isCollapsed ? 'w-16 lg:w-20' : 'w-64'}
      fixed lg:relative
      z-40
    `}>
      {/* Logo */}
      <div className="p-4 flex items-center justify-center border-b border-gray-800">
        <div className="flex items-center justify-center">
          <i className="fas fa-graduation-cap text-blue-400 text-xl lg:text-2xl"></i>
          {!isCollapsed && <span className="ml-3 text-xl font-bold text-blue-400">UTOPIA</span>}
        </div>
      </div>

      {/* Menu Items */}
      <div className="p-2 lg:p-4 flex-1">
        <ul className="space-y-1 lg:space-y-2">
          {menuItems.map((item) => (
            <li 
              key={item.id}
              className={`
                flex items-center p-3 rounded-lg cursor-pointer transition-colors group relative
                ${activeView === item.id ? 'bg-blue-600 text-white' : 'hover:bg-gray-800'}
                ${isCollapsed ? 'justify-center' : ''}
              `}
              onClick={() => handleItemClick(item.id)}
              title={isCollapsed ? item.label : ''}
            >
              <i className={`fas ${item.icon} text-lg lg:text-base ${isCollapsed ? '' : 'w-6 text-center'}`}></i>
              {!isCollapsed && <span className="ml-3">{item.label}</span>}
              
              {/* Tooltip for collapsed state */}
              {isCollapsed && (
                <div className="absolute left-full ml-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-lg">
                  {item.label}
                  <div className="absolute right-full top-1/2 transform -translate-y-1/2 border-8 border-transparent border-r-gray-800"></div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Toggle Button */}
      <div className="p-3 lg:p-4 border-t border-gray-800">
        <button 
          onClick={onToggle}
          className="w-full flex items-center justify-center p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <i className={`fas ${isCollapsed ? 'fa-chevron-right' : 'fa-chevron-left'} text-sm lg:text-base`}></i>
          {!isCollapsed && <span className="ml-2 text-sm">Collapse</span>}
        </button>
      </div>
    </div>
  );
};

// Student Header Component with Search
const StudentHeader = ({ studentData, searchQuery, setSearchQuery, onMenuToggle, isSidebarCollapsed }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  return (
    <header className="bg-white shadow-md py-4 px-4 lg:px-6 flex items-center justify-between">
      {/* Left Section - Menu Button and Search */}
      <div className="flex items-center flex-1 max-w-3xl">
        {/* Mobile Menu Button - Hidden on desktop since sidebar is always visible */}
        <button 
          onClick={onMenuToggle}
          className="lg:hidden p-2 rounded-lg mr-3 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <i className="fas fa-bars text-gray-600 text-lg"></i>
        </button>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex-1">
          <div className="relative max-w-lg">
            <input
              type="text"
              placeholder="Search courses, materials, assignments..."
              className="w-full pl-10 pr-10 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm lg:text-base"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i className="fas fa-search text-gray-400"></i>
            </div>
            {searchQuery && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <i className="fas fa-times text-gray-400 hover:text-gray-600"></i>
              </button>
            )}
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
            <div className="h-8 w-8 lg:h-10 lg:w-10 rounded-full bg-gradient-to-r from-green-500 to-teal-600 flex items-center justify-center">
              <span className="text-white font-semibold text-sm lg:text-base">
                {studentData.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium text-gray-800">{studentData.name}</p>
              <p className="text-xs text-gray-500">{studentData.major}</p>
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
                  <p className="text-sm font-medium text-gray-800">{studentData.name}</p>
                  <p className="text-xs text-gray-500">{studentData.major} • {studentData.id}</p>
                </div>
                <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                  <i className="fas fa-user mr-3 text-gray-400"></i>
                  Profile
                </a>
                <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors">
                  <i className="fas fa-cog mr-3 text-gray-400"></i>
                  Settings
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

// Dashboard View Component
const DashboardView = ({ studentData, searchQuery }) => {
  const totalCredits = studentData.courses.reduce((sum, course) => sum + course.credits, 0);
  const averageGrade = "B+"; // Simplified calculation

  return (
    <div>
      <h2 className="text-xl lg:text-2xl font-semibold mb-6">Student Dashboard</h2>
      
      {searchQuery && (
        <div className="mb-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-blue-700 text-sm lg:text-base">
            Showing results for: <span className="font-semibold">"{searchQuery}"</span>
          </p>
        </div>
      )}
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6 mb-6 lg:mb-8">
        <div className="bg-white rounded-lg shadow p-3 lg:p-4">
          <div className="flex items-center">
            <div className="rounded-full bg-blue-100 p-2 lg:p-3 mr-3 lg:mr-4">
              <i className="fas fa-book text-blue-500 text-lg lg:text-xl"></i>
            </div>
            <div>
              <p className="text-gray-500 text-xs lg:text-sm">Enrolled Courses</p>
              <p className="text-lg lg:text-2xl font-bold">{studentData.courses.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-3 lg:p-4">
          <div className="flex items-center">
            <div className="rounded-full bg-green-100 p-2 lg:p-3 mr-3 lg:mr-4">
              <i className="fas fa-credit-card text-green-500 text-lg lg:text-xl"></i>
            </div>
            <div>
              <p className="text-gray-500 text-xs lg:text-sm">Total Credits</p>
              <p className="text-lg lg:text-2xl font-bold">{totalCredits}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-3 lg:p-4">
          <div className="flex items-center">
            <div className="rounded-full bg-yellow-100 p-2 lg:p-3 mr-3 lg:mr-4">
              <i className="fas fa-chart-line text-yellow-500 text-lg lg:text-xl"></i>
            </div>
            <div>
              <p className="text-gray-500 text-xs lg:text-sm">Average Grade</p>
              <p className="text-lg lg:text-2xl font-bold">{averageGrade}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-3 lg:p-4">
          <div className="flex items-center">
            <div className="rounded-full bg-purple-100 p-2 lg:p-3 mr-3 lg:mr-4">
              <i className="fas fa-calendar-day text-purple-500 text-lg lg:text-xl"></i>
            </div>
            <div>
              <p className="text-gray-500 text-xs lg:text-sm">Today's Classes</p>
              <p className="text-lg lg:text-2xl font-bold">2</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        <div className="bg-white rounded-lg shadow p-4 lg:p-6">
          <h3 className="font-medium text-base lg:text-lg mb-3 lg:mb-4">Today's Classes</h3>
          <div className="space-y-3 lg:space-y-4">
            <div className="flex items-center justify-between py-2">
              <div className="flex-1">
                <p className="font-medium text-sm lg:text-base">CS101 - Intro to Programming</p>
                <p className="text-xs lg:text-sm text-gray-500">Tech Building 202 • 9:00-10:15 AM</p>
              </div>
              <div className="bg-blue-100 text-blue-800 text-xs font-medium py-1 px-2 rounded ml-2">
                Dr. Smith
              </div>
            </div>
            <div className="flex items-center justify-between py-2">
              <div className="flex-1">
                <p className="font-medium text-sm lg:text-base">MATH202 - Calculus II</p>
                <p className="text-xs lg:text-sm text-gray-500">Science Hall 105 • 1:30-2:45 PM</p>
              </div>
              <div className="bg-blue-100 text-blue-800 text-xs font-medium py-1 px-2 rounded ml-2">
                Prof. Davis
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4 lg:p-6">
          <h3 className="font-medium text-base lg:text-lg mb-3 lg:mb-4">Recent Grades</h3>
          <div className="space-y-3">
            {studentData.courses.slice(0, 3).map(course => (
              <div key={course.id} className="flex justify-between items-center py-2 border-b border-gray-100">
                <div className="flex-1">
                  <p className="font-medium text-sm lg:text-base">{course.id}</p>
                  <p className="text-xs lg:text-sm text-gray-500 truncate">{course.name}</p>
                </div>
                <div className="text-right ml-2">
                  <p className={`text-sm font-medium ${course.grade === 'A' ? 'text-green-600' : course.grade.includes('A') ? 'text-blue-600' : 'text-yellow-600'}`}>
                    {course.grade}
                  </p>
                  <p className="text-xs text-gray-500">{course.credits} credits</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Schedule View Component (Timetable Style)
const ScheduleView = ({ timetable, today, searchQuery }) => {
  // Collect max number of classes in any day (to make rows even)
  const maxClasses = Math.max(...timetable.map(d => d.classes.length));

  // Mobile Card View for Schedule
  const ScheduleCard = ({ day }) => (
    <div className={`bg-white rounded-lg shadow p-4 mb-4 border-2 ${
      day.day === today ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
    }`}>
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold text-gray-900">
          {day.day}
          {day.day === today && (
            <span className="ml-2 text-xs bg-blue-500 text-white px-2 py-1 rounded-full">Today</span>
          )}
        </h3>
        <span className="text-sm text-gray-500">{day.classes.length} classes</span>
      </div>
      
      <div className="space-y-3">
        {day.classes.map((classItem, index) => (
          <div key={index} className="bg-blue-100 rounded-lg p-3 border border-blue-200">
            <div className="font-semibold text-blue-800 text-sm">{classItem.course}</div>
            <div className="text-xs text-blue-600 mt-1">{classItem.time}</div>
            <div className="text-xs text-blue-500 mt-1">{classItem.location}</div>
          </div>
        ))}
        {day.classes.length === 0 && (
          <div className="text-center py-4 text-gray-400 text-sm">
            No classes scheduled
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div>
      <h2 className="text-xl lg:text-2xl font-semibold mb-6">Class Schedule</h2>

      {searchQuery && (
        <div className="mb-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-blue-700 text-sm lg:text-base">
            Showing filtered schedule for: <span className="font-semibold">"{searchQuery}"</span>
          </p>
        </div>
      )}

      {/* Mobile View - Cards */}
      <div className="lg:hidden space-y-4">
        {timetable.map((day, index) => (
          <ScheduleCard key={index} day={day} />
        ))}
        {timetable.length === 0 && searchQuery && (
          <div className="text-center py-8 bg-white rounded-lg shadow">
            <i className="fas fa-calendar-times text-gray-400 text-4xl mb-3"></i>
            <p className="text-gray-500">No schedule found matching "{searchQuery}"</p>
          </div>
        )}
      </div>

      {/* Desktop View - Table */}
      <div className="hidden lg:block bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 bg-gray-50 border-b border-gray-200">
          <p className="text-sm text-gray-600">
            Today is <span className="font-medium text-blue-600">{today}</span>
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-200">
            <thead>
              <tr>
                <th className="border border-gray-200 bg-gray-100 px-4 py-2 text-left">Time Slot</th>
                {timetable.map((day, idx) => (
                  <th
                    key={idx}
                    className={`border border-gray-200 px-4 py-2 text-center ${
                      day.day === today ? "bg-blue-50 text-blue-700 font-semibold" : "bg-gray-50 text-gray-700"
                    }`}
                  >
                    {day.day}
                    {day.day === today && (
                      <span className="block text-xs text-blue-500">(Today)</span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: maxClasses }).map((_, rowIdx) => (
                <tr key={rowIdx}>
                  <td className="border border-gray-200 px-4 py-2 font-medium text-gray-600">
                    {`Period ${rowIdx + 1}`}
                  </td>
                  {timetable.map((day, colIdx) => (
                    <td
                      key={colIdx}
                      className={`border border-gray-200 px-4 py-2 text-center ${
                        day.day === today ? "bg-blue-50" : ""
                      }`}
                    >
                      {day.classes[rowIdx] ? (
                        <div className="bg-blue-100 text-blue-800 text-sm py-2 px-3 rounded">
                          <div className="font-semibold">{day.classes[rowIdx].course}</div>
                          <div className="text-xs">{day.classes[rowIdx].time}</div>
                          <div className="text-xs text-blue-600">{day.classes[rowIdx].location}</div>
                        </div>
                      ) : (
                        <span className="text-gray-400 text-sm">—</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Enrolled Courses View Component
const EnrolledCoursesView = ({ courses, searchQuery }) => {
  // Mobile Card View for Courses
  const CourseCard = ({ course }) => (
    <div className="bg-white rounded-lg shadow p-4 mb-4 border border-gray-200">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="font-bold text-base text-gray-900">{course.id}</h3>
          <p className="text-sm text-gray-600 mt-1">{course.name}</p>
        </div>
        <span className={`px-2 py-1 rounded text-xs font-semibold ${
          course.grade === 'A' ? 'bg-green-100 text-green-800' : 
          course.grade.includes('A') ? 'bg-blue-100 text-blue-800' : 
          'bg-yellow-100 text-yellow-800'
        }`}>
          {course.grade}
        </span>
      </div>
      <p className="text-gray-600 text-sm mb-3">{course.instructor}</p>
      <div className="flex justify-between items-center text-sm text-gray-500">
        <span>{course.credits} Credits</span>
        <div className="flex space-x-3">
          <button className="text-blue-600 hover:text-blue-800 text-xs">Materials</button>
          <button className="text-blue-600 hover:text-blue-800 text-xs">Assignments</button>
          <button className="text-blue-600 hover:text-blue-800 text-xs">Grades</button>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <h2 className="text-xl lg:text-2xl font-semibold mb-6">Enrolled Courses</h2>
      
      {searchQuery && (
        <div className="mb-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-blue-700 text-sm lg:text-base">
            Showing {courses.length} course(s) for: <span className="font-semibold">"{searchQuery}"</span>
          </p>
        </div>
      )}
      
      {/* Mobile View - Cards */}
      <div className="lg:hidden space-y-4">
        {courses.map(course => (
          <CourseCard key={course.id} course={course} />
        ))}
        {courses.length === 0 && searchQuery && (
          <div className="text-center py-8 bg-white rounded-lg shadow">
            <i className="fas fa-book text-gray-400 text-4xl mb-3"></i>
            <p className="text-gray-500">No courses found matching "{searchQuery}"</p>
          </div>
        )}
      </div>
      
      {/* Desktop View - Grid */}
      <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 gap-6">
        {courses.map(course => (
          <div key={course.id} className="bg-white rounded-lg shadow p-5">
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-bold text-lg">{course.id} - {course.name}</h3>
              <span className={`px-2 py-1 rounded text-xs font-semibold ${course.grade === 'A' ? 'bg-green-100 text-green-800' : course.grade.includes('A') ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'}`}>
                {course.grade}
              </span>
            </div>
            <p className="text-gray-600 mb-4">{course.instructor}</p>
            <div className="flex justify-between text-sm text-gray-500">
              <span>{course.credits} Credits</span>
              <div className="flex space-x-3">
                <button className="text-blue-600 hover:text-blue-800">Materials</button>
                <button className="text-blue-600 hover:text-blue-800">Assignments</button>
                <button className="text-blue-600 hover:text-blue-800">Grades</button>
              </div>
            </div>
          </div>
        ))}
        {courses.length === 0 && searchQuery && (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-500 text-lg">No courses found matching "{searchQuery}"</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Course Plan View Component
const CoursePlanView = ({ coursePlan, searchQuery }) => {
  // Mobile Card View for Course Plan
  const SemesterCard = ({ semester, index }) => (
    <div className="bg-white rounded-lg shadow p-4 mb-4 border border-gray-200">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-bold text-base text-gray-900">{semester.semester}</h3>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          semester.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
        }`}>
          {semester.status}
        </span>
      </div>
      
      <div className="grid grid-cols-2 gap-2">
        {semester.courses.map((course, courseIndex) => (
          <div key={courseIndex} className="border border-gray-200 rounded-lg p-2 text-center">
            <p className="font-medium text-sm">{course}</p>
            <p className="text-xs text-gray-500 mt-1">3 Credits</p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div>
      <h2 className="text-xl lg:text-2xl font-semibold mb-6">Course Plan</h2>
      
      {searchQuery && (
        <div className="mb-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-blue-700 text-sm lg:text-base">
            Showing filtered course plan for: <span className="font-semibold">"{searchQuery}"</span>
          </p>
        </div>
      )}
      
      {/* Mobile View - Cards */}
      <div className="lg:hidden space-y-4">
        {coursePlan.map((semester, index) => (
          <SemesterCard key={index} semester={semester} index={index} />
        ))}
        {coursePlan.length === 0 && searchQuery && (
          <div className="text-center py-8 bg-white rounded-lg shadow">
            <i className="fas fa-road text-gray-400 text-4xl mb-3"></i>
            <p className="text-gray-500">No course plan found matching "{searchQuery}"</p>
          </div>
        )}
      </div>
      
      {/* Desktop View */}
      <div className="hidden lg:block space-y-6">
        {coursePlan.map((semester, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg">{semester.semester}</h3>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${semester.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
                {semester.status}
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
              {semester.courses.map((course, courseIndex) => (
                <div key={courseIndex} className="border border-gray-200 rounded-lg p-3 text-center">
                  <p className="font-medium">{course}</p>
                  <p className="text-xs text-gray-500 mt-1">3 Credits</p>
                </div>
              ))}
            </div>
          </div>
        ))}
        {coursePlan.length === 0 && searchQuery && (
          <div className="text-center py-8">
            <p className="text-gray-500 text-lg">No course plan found matching "{searchQuery}"</p>
          </div>
        )}
      </div>
    </div>
  );
};

// Attendance View Component
const AttendanceView = ({ attendance, searchQuery }) => {
  const filteredAttendance = searchQuery 
    ? Object.fromEntries(
        Object.entries(attendance).filter(([course]) => 
          course.toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    : attendance;

  // Mobile Card View for Attendance
  const AttendanceCard = ({ course, data }) => (
    <div className="bg-white rounded-lg shadow p-4 mb-4 border border-gray-200">
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-bold text-base text-gray-900">{course}</h3>
        <span className={`px-2 py-1 rounded text-xs font-semibold ${
          data.percentage >= 90 ? 'bg-green-100 text-green-800' : 
          data.percentage >= 75 ? 'bg-yellow-100 text-yellow-800' : 
          'bg-red-100 text-red-800'
        }`}>
          {data.percentage >= 90 ? 'Excellent' : data.percentage >= 75 ? 'Satisfactory' : 'Needs Improvement'}
        </span>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-3">
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">{data.present}</div>
          <div className="text-xs text-gray-500">Present</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-red-600">{data.absent}</div>
          <div className="text-xs text-gray-500">Absent</div>
        </div>
      </div>
      
      <div className="mb-2">
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Attendance Rate</span>
          <span>{data.percentage}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full ${
              data.percentage >= 90 ? 'bg-green-600' : 
              data.percentage >= 75 ? 'bg-yellow-400' : 
              'bg-red-600'
            }`}
            style={{ width: `${data.percentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <h2 className="text-xl lg:text-2xl font-semibold mb-6">Attendance Records</h2>
      
      {searchQuery && (
        <div className="mb-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-blue-700 text-sm lg:text-base">
            Showing {Object.keys(filteredAttendance).length} course(s) for: <span className="font-semibold">"{searchQuery}"</span>
          </p>
        </div>
      )}
      
      {/* Mobile View - Cards */}
      <div className="lg:hidden space-y-4">
        {Object.entries(filteredAttendance).map(([course, data]) => (
          <AttendanceCard key={course} course={course} data={data} />
        ))}
        {Object.keys(filteredAttendance).length === 0 && searchQuery && (
          <div className="text-center py-8 bg-white rounded-lg shadow">
            <i className="fas fa-user-check text-gray-400 text-4xl mb-3"></i>
            <p className="text-gray-500">No attendance records found matching "{searchQuery}"</p>
          </div>
        )}
      </div>
      
      {/* Desktop View - Table */}
      <div className="hidden lg:block bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Course
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Classes Attended
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Classes Missed
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Attendance Percentage
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {Object.entries(filteredAttendance).map(([course, data]) => (
              <tr key={course}>
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                  {course}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {data.present}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {data.absent}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                      <div 
                        className={`h-2.5 rounded-full ${data.percentage >= 90 ? 'bg-green-600' : data.percentage >= 75 ? 'bg-yellow-400' : 'bg-red-600'}`}
                        style={{ width: `${data.percentage}%` }}
                      ></div>
                    </div>
                    <span>{data.percentage}%</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${data.percentage >= 90 ? 'bg-green-100 text-green-800' : data.percentage >= 75 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                    {data.percentage >= 90 ? 'Excellent' : data.percentage >= 75 ? 'Satisfactory' : 'Needs Improvement'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {Object.keys(filteredAttendance).length === 0 && searchQuery && (
          <div className="text-center py-8">
            <p className="text-gray-500">No attendance records found matching "{searchQuery}"</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentPortal;
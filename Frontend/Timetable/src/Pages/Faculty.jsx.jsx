import React, { useState } from 'react';

const FacultyPortal = () => {
  const [activeView, setActiveView] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Sample data for faculty
  const facultyData = {
    name: "Dr. Robert Smith",
    department: "Computer Science",
    courses: [
      { id: "CS101", name: "Introduction to Programming", enrolled: 42, schedule: "MWF 9:00-10:15 AM", location: "Tech Building 202" },
      { id: "CS301", name: "Data Structures", enrolled: 35, schedule: "TTh 11:00-12:15 PM", location: "Science Hall 105" },
      { id: "CS450", name: "Advanced Algorithms", enrolled: 28, schedule: "MWF 2:00-3:15 PM", location: "Tech Building 305" }
    ],
    todaySchedule: [
      { time: "9:00 AM - 10:15 AM", course: "CS101", location: "Tech Building 202" },
      { time: "2:00 PM - 3:15 PM", course: "CS450", location: "Tech Building 305" }
    ],
    timetable: [
      { day: "Monday", classes: ["CS101 (9:00-10:15)", "CS450 (2:00-3:15)"] },
      { day: "Tuesday", classes: ["CS301 (11:00-12:15)"] },
      { day: "Wednesday", classes: ["CS101 (9:00-10:15)", "CS450 (2:00-3:15)"] },
      { day: "Thursday", classes: ["CS301 (11:00-12:15)"] },
      { day: "Friday", classes: ["CS101 (9:00-10:15)", "Office Hours (1:00-2:00)"] }
    ],
    attendance: {
      CS101: { present: 38, absent: 4, percentage: 90.5 },
      CS301: { present: 32, absent: 3, percentage: 91.4 },
      CS450: { present: 26, absent: 2, percentage: 92.9 }
    }
  };

  // Get today's day name
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });

  // Render different views based on activeView state
  const renderActiveView = () => {
    switch(activeView) {
      case 'dashboard':
        return <DashboardView facultyData={facultyData} />;
      case 'courses':
        return <CoursesView courses={facultyData.courses} />;
      case 'attendance':
        return <AttendanceView attendance={facultyData.attendance} />;
      case 'today':
        return <TodayView schedule={facultyData.todaySchedule} />;
      case 'timetable':
        return <TimetableView timetable={facultyData.timetable} today={today} />;
      default:
        return <DashboardView facultyData={facultyData} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`${sidebarCollapsed ? 'w-20' : 'w-64'} transition-width duration-300`}>
        <FacultySidebar 
          isCollapsed={sidebarCollapsed} 
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
          activeView={activeView}
          setActiveView={setActiveView}
        />
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <FacultyHeader facultyData={facultyData} />
        
        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {renderActiveView()}
        </main>
      </div>
    </div>
  );
};

// Faculty Sidebar Component
const FacultySidebar = ({ isCollapsed, onToggle, activeView, setActiveView }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'fa-th-large' },
    { id: 'courses', label: 'Courses', icon: 'fa-book' },
    { id: 'attendance', label: 'Attendance', icon: 'fa-user-check' },
    { id: 'today', label: 'Today', icon: 'fa-calendar-day' },
    { id: 'timetable', label: 'Timetable', icon: 'fa-calendar-alt' },
  ];

  const handleItemClick = (itemId) => {
    setActiveView(itemId);
  };

  return (
    <div className={`bg-gray-900 text-white h-full flex flex-col transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`}>
      {/* Logo */}
      <div className="p-5 flex items-center justify-center border-b border-gray-800">
        <div className="text-2xl font-bold text-blue-400 flex items-center">
          <i className="fas fa-chalkboard-teacher mr-3"></i>
          {!isCollapsed && <span>UTOPIA</span>}
        </div>
      </div>

      {/* Menu Items */}
      <div className="p-4 flex-1">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li 
              key={item.id}
              className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${activeView === item.id ? 'bg-blue-600 text-white' : 'hover:bg-gray-800'}`}
              onClick={() => handleItemClick(item.id)}
              title={isCollapsed ? item.label : ''}
            >
              <i className={`fas ${item.icon} w-6 text-center`}></i>
              {!isCollapsed && <span className="ml-3">{item.label}</span>}
            </li>
          ))}
        </ul>
      </div>

      {/* Toggle Button */}
      <div className="p-4 border-t border-gray-800">
        <button 
          onClick={onToggle}
          className="w-full flex items-center justify-center p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <i className={`fas ${isCollapsed ? 'fa-chevron-right' : 'fa-chevron-left'}`}></i>
          {!isCollapsed && <span className="ml-2">Collapse</span>}
        </button>
      </div>
    </div>
  );
};

// Faculty Header Component
const FacultyHeader = ({ facultyData }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  return (
    <header className="bg-white shadow-md py-4 px-6 flex items-center justify-between">
      {/* Search Bar */}
      <div className="flex-1 max-w-lg">
        <form onSubmit={handleSearch} className="relative">
          <div className="relative">
            <input
              type="text"
              placeholder="Search students, courses, materials..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </form>
      </div>

      {/* Right Section with Icons */}
      <div className="flex items-center space-x-4">
        {/* Notification Bell */}
        <div className="relative">
          <button className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <svg className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
          </button>
        </div>

        {/* Profile Dropdown */}
        <div className="relative">
          <button 
            className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full"
            onClick={() => setIsProfileOpen(!isProfileOpen)}
          >
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
              <span className="text-white font-semibold">
                {facultyData.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-medium text-gray-800">{facultyData.name}</p>
              <p className="text-xs text-gray-500">{facultyData.department}</p>
            </div>
            <svg className="h-5 w-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>

          {/* Dropdown Menu */}
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-10 border border-gray-200">
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-800">{facultyData.name}</p>
                <p className="text-xs text-gray-500">{facultyData.department}</p>
              </div>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</a>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
              <div className="border-t border-gray-100"></div>
              <a href="#" className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100">Sign out</a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

// Dashboard View Component
const DashboardView = ({ facultyData }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Faculty Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="rounded-full bg-blue-100 p-3 mr-4">
              <i className="fas fa-book text-blue-500 text-xl"></i>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Courses Teaching</p>
              <p className="text-2xl font-bold">{facultyData.courses.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="rounded-full bg-green-100 p-3 mr-4">
              <i className="fas fa-users text-green-500 text-xl"></i>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Total Students</p>
              <p className="text-2xl font-bold">{facultyData.courses.reduce((acc, course) => acc + course.enrolled, 0)}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="rounded-full bg-yellow-100 p-3 mr-4">
              <i className="fas fa-calendar-day text-yellow-500 text-xl"></i>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Today's Classes</p>
              <p className="text-2xl font-bold">{facultyData.todaySchedule.length}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-medium text-lg mb-4">Today's Schedule</h3>
          <div className="space-y-4">
            {facultyData.todaySchedule.map((classItem, index) => (
              <div key={index} className="flex items-start py-2">
                <div className="bg-blue-100 text-blue-800 text-xs font-medium py-1 px-2 rounded mr-3">
                  {classItem.time}
                </div>
                <div>
                  <p className="font-medium">{classItem.course}</p>
                  <p className="text-sm text-gray-500">{classItem.location}</p>
                </div>
              </div>
            ))}
            {facultyData.todaySchedule.length === 0 && (
              <p className="text-gray-500">No classes scheduled for today</p>
            )}
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-medium text-lg mb-4">Attendance Overview</h3>
          <div className="space-y-3">
            {Object.entries(facultyData.attendance).map(([course, data]) => (
              <div key={course} className="flex justify-between items-center py-2 border-b border-gray-100">
                <div>
                  <p className="font-medium">{course}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{data.percentage}%</p>
                  <p className="text-xs text-gray-500">{data.present}/{data.present + data.absent} students</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Courses View Component
const CoursesView = ({ courses }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">My Courses</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(course => (
          <div key={course.id} className="bg-white rounded-lg shadow p-5">
            <div className="mb-4">
              <h3 className="font-bold text-lg text-blue-800">{course.id}</h3>
              <h4 className="font-semibold text-gray-800">{course.name}</h4>
            </div>
            <div className="text-sm text-gray-600 mb-4">
              <p className="flex items-center mb-2">
                <i className="fas fa-clock mr-2"></i> {course.schedule}
              </p>
              <p className="flex items-center mb-2">
                <i className="fas fa-map-marker-alt mr-2"></i> {course.location}
              </p>
              <p className="flex items-center">
                <i className="fas fa-users mr-2"></i> {course.enrolled} students enrolled
              </p>
            </div>
            <div className="flex justify-between pt-4 border-t border-gray-100">
              <button className="text-blue-600 text-sm font-medium">Manage</button>
              <button className="text-gray-600 text-sm font-medium">Roster</button>
              <button className="text-gray-600 text-sm font-medium">Materials</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Attendance View Component
const AttendanceView = ({ attendance }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Attendance Records</h2>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
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
            {Object.entries(attendance).map(([course, data]) => (
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
                    {data.percentage >= 90 ? 'Excellent' : data.percentage >= 75 ? 'Good' : 'Needs Attention'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Today View Component
const TodayView = ({ schedule }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Today's Classes</h2>
      
      {schedule.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-6 text-center">
          <i className="fas fa-calendar-check text-4xl text-gray-300 mb-4"></i>
          <h3 className="text-lg font-medium text-gray-700 mb-2">No classes scheduled for today</h3>
          <p className="text-gray-500">Enjoy your day off!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {schedule.map((classItem, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg">{classItem.course}</h3>
                <span className="bg-blue-100 text-blue-800 text-xs font-medium py-1 px-2 rounded">
                  {classItem.time}
                </span>
              </div>
              <div className="mb-4">
                <p className="text-gray-600 flex items-center">
                  <i className="fas fa-map-marker-alt mr-2"></i> {classItem.location}
                </p>
              </div>
              <div className="flex space-x-2">
                <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm">Take Attendance</button>
                <button className="bg-gray-200 text-gray-800 px-3 py-1 rounded text-sm">View Roster</button>
                <button className="bg-gray-200 text-gray-800 px-3 py-1 rounded text-sm">Materials</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Timetable View Component
const TimetableView = ({ timetable, today }) => {
  // Collect max number of classes in any day (to make rows even)
  const maxClasses = Math.max(...timetable.map(d => d.classes.length));

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Weekly Timetable</h2>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 bg-gray-50 border-b border-gray-200">
          <p className="text-sm text-gray-600">
            Today is <span className="font-medium text-blue-600">{today}</span>
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-200">
            <thead>
              <tr>
                <th className="border border-gray-200 bg-gray-100 px-4 py-2 text-left">Slot</th>
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
                    {`Slot ${rowIdx + 1}`}
                  </td>
                  {timetable.map((day, colIdx) => (
                    <td
                      key={colIdx}
                      className={`border border-gray-200 px-4 py-2 text-center ${
                        day.day === today ? "bg-blue-50" : ""
                      }`}
                    >
                      {day.classes[rowIdx] ? (
                        <span className="bg-gray-100 text-gray-800 text-sm py-1 px-2 rounded">
                          {day.classes[rowIdx]}
                        </span>
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


export default FacultyPortal;
import React from 'react';
const Sidebar = ({ isCollapsed, onToggle, activeView, setActiveView }) => {
  const menuItems = {
    academic: [
      { id: 'schedule', label: 'Schedule', icon: 'fa-calendar-alt' },
      { id: 'enrolled-courses', label: 'Enrolled Courses', icon: 'fa-graduation-cap' },
      { id: 'course-plan', label: 'Course Plan', icon: 'fa-road' },
      { id: 'attendance', label: 'Attendance', icon: 'fa-user-check' },
     
    ],
    settings: [
      { id: 'account-settings', label: 'Account Settings', icon: 'fa-user-cog' },
      { id: 'notification-preferences', label: 'Notification Preferences', icon: 'fa-bell' },
      { id: 'logout', label: 'Logout', icon: 'fa-sign-out-alt' },
    ]
  };

  const handleItemClick = (itemId) => {
    setActiveView(itemId);
  };

  return (
    <div className={`bg-gray-900 text-white h-full flex flex-col transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`}>
      {/* Logo */}
      <div className="p-5 flex items-center justify-center border-b border-gray-800">
        <div className="text-2xl font-bold text-blue-400 flex items-center">
          <i className="fas fa-gem mr-3"></i>
          {!isCollapsed && <span>UTOPIA</span>}
        </div>
      </div>

      {/* Dashboard */}
      <div className="p-4">
        <div 
          className={`flex items-center p-3 rounded-lg mb-2 cursor-pointer transition-colors ${activeView === 'dashboard' ? 'bg-blue-600 text-white' : 'hover:bg-gray-800'}`}
          onClick={() => handleItemClick('dashboard')}
        >
          <i className="fas fa-th-large w-6 text-center"></i>
          {!isCollapsed && <span className="ml-3">Dashboard</span>}
        </div>
      </div>

      {/* ACADEMIC Section */}
      <div className="p-4">
        {!isCollapsed && (
          <h3 className="uppercase text-xs text-gray-500 font-semibold mb-3 tracking-wider">ACADEMIC</h3>
        )}
        <ul className="space-y-2">
          {menuItems.academic.map((item) => (
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
export default Sidebar;
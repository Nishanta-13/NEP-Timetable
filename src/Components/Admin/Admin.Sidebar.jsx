import React from "react";

const AdminSidebar = ({ isCollapsed, onToggle, activeView, setActiveView }) => {
  const menuItems = [
    { id: 'timetable', label: 'Timetable', icon: 'fa-calendar-alt' },
    { id: 'student', label: 'Student', icon: 'fa-user-graduate' },
    { id: 'professor', label: 'Professor', icon: 'fa-chalkboard-teacher' },
  ];

  const handleItemClick = (itemId) => {
    setActiveView(itemId);
    // Close sidebar on mobile after selection
    if (window.innerWidth < 1024) {
      onToggle();
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {!isCollapsed && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:relative
        bg-gray-900 text-white h-full flex flex-col transition-all duration-300 z-50
        ${isCollapsed ? 'w-0 lg:w-20' : 'w-64'}
        transform ${isCollapsed ? '-translate-x-full lg:translate-x-0' : 'translate-x-0'}
      `}>
        {/* Logo and Close Button (Mobile) */}
        <div className="p-5 flex items-center justify-between border-b border-gray-800">
          <div className="text-2xl font-bold text-blue-600 flex items-center">
            <i className="fas fa-cogs mr-3"></i>
            {!isCollapsed && <span>UTOPIA ADMIN</span>}
          </div>
          
          {/* Mobile Close Button */}
          {!isCollapsed && (
            <button 
              onClick={onToggle}
              className="lg:hidden text-gray-400 hover:text-white text-xl"
            >
              <i className="fas fa-times"></i>
            </button>
          )}
        </div>

        {/* Menu Items */}
        <div className="p-4 flex-1">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li 
                key={item.id}
                className={`
                  flex items-center p-3 rounded-lg cursor-pointer transition-colors group
                  ${activeView === item.id ? 'bg-blue-600 text-white' : 'hover:bg-gray-800'}
                  ${isCollapsed ? 'justify-center' : ''}
                `}
                onClick={() => handleItemClick(item.id)}
                title={isCollapsed ? item.label : ''}
              >
                <i className={`fas ${item.icon} ${isCollapsed ? 'text-lg' : 'w-6 text-center'}`}></i>
                {!isCollapsed && <span className="ml-3">{item.label}</span>}
                
                {/* Tooltip for collapsed state */}
                {isCollapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                    {item.label}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Toggle Button - Desktop Only */}
        <div className="p-4 border-t border-gray-800 hidden lg:block">
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
    </>
  );
};

export default AdminSidebar;
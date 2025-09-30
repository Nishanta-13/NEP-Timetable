import React, { useState } from 'react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New timetable generated for Semester 2', time: '2 hours ago', read: false },
    { id: 2, message: 'Faculty availability updated', time: '5 hours ago', read: false },
    { id: 3, message: 'Classroom capacity constraints added', time: '1 day ago', read: true },
  ]);

  const markAsRead = (id) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? {...notification, read: true} : notification
    ));
  };

  const stats = [
    { title: 'Programs', value: '4', change: '+0%', icon: '📚', description: 'B.Ed, M.Ed, FYUP, ITEP' },
    { title: 'Faculty Members', value: '42', change: '+5%', icon: '👨‍🏫', description: 'Across all programs' },
    { title: 'Classrooms', value: '18', change: '+0%', icon: '🏫', description: 'Including labs' },
    { title: 'Generated Timetables', value: '12', change: '+20%', icon: '📅', description: 'This semester' },
  ];

  const recentActivities = [
    { action: 'Timetable Generated', program: 'B.Ed Semester 3', time: '2 hours ago', user: 'Admin' },
    { action: 'Constraints Updated', program: 'All Programs', time: '5 hours ago', user: 'Prof. Sharma' },
    { action: 'Faculty Availability', program: 'M.Ed Program', time: 'Yesterday', user: 'Dr. Kapoor' },
    { action: 'New Course Added', program: 'FYUP Psychology', time: '2 days ago', user: 'Admin' },
  ];

  const upcomingTasks = [
    { task: 'Review FYUP Semester 1 timetable', due: 'Tomorrow', priority: 'high' },
    { task: 'Add new faculty availability', due: 'In 2 days', priority: 'medium' },
    { task: 'Generate ITEP practical schedule', due: 'In 3 days', priority: 'high' },
    { task: 'Update classroom capacities', due: 'Next week', priority: 'low' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">NEP 2020 Timetable Generator</h1>
          <div className="flex items-center space-x-4">
            <button className="relative p-2 bg-gray-100 rounded-full hover:bg-gray-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              {notifications.filter(n => !n.read).length > 0 && (
                <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full"></span>
              )}
            </button>
            <div className="flex items-center space-x-2">
              <div className="h-10 w-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">AD</div>
              <span className="text-gray-700">Admin</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
          <p className="text-gray-600">Welcome to the NEP 2020 Timetable Generator system</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="text-3xl mr-4">{stat.icon}</div>
                <div>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <div className="flex items-baseline">
                    <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                    <span className="ml-2 text-sm text-green-500">{stat.change}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2">
            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow mb-8">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
              </div>
              <div className="p-6 grid grid-cols-2 gap-4">
                <button className="flex flex-col items-center justify-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="text-sm font-medium text-blue-600">Generate Timetable</span>
                </button>
                <button className="flex flex-col items-center justify-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span className="text-sm font-medium text-green-600">Add New Course</span>
                </button>
                <button className="flex flex-col items-center justify-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span className="text-sm font-medium text-purple-600">Manage Faculty</span>
                </button>
                <button className="flex flex-col items-center justify-center p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-yellow-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <span className="text-sm font-medium text-yellow-600">Room Management</span>
                </button>
              </div>
            </div>

            {/* Recent Activities */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Recent Activities</h3>
              </div>
              <div className="divide-y divide-gray-200">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="px-6 py-4">
                    <div className="flex justify-between">
                      <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                      <p className="text-sm text-gray-500">{activity.time}</p>
                    </div>
                    <p className="text-sm text-gray-600">{activity.program}</p>
                    <p className="text-xs text-gray-500 mt-1">By {activity.user}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-1">
            {/* Upcoming Tasks */}
            <div className="bg-white rounded-lg shadow mb-8">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Upcoming Tasks</h3>
              </div>
              <div className="divide-y divide-gray-200">
                {upcomingTasks.map((task, index) => (
                  <div key={index} className="px-6 py-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{task.task}</p>
                        <p className="text-xs text-gray-500">Due: {task.due}</p>
                      </div>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        task.priority === 'high' ? 'bg-red-100 text-red-800' : 
                        task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-green-100 text-green-800'
                      }`}>
                        {task.priority}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Notifications */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Notifications</h3>
              </div>
              <div className="divide-y divide-gray-200">
                {notifications.map(notification => (
                  <div key={notification.id} className={`px-6 py-4 ${!notification.read ? 'bg-blue-50' : ''}`}>
                    <div className="flex justify-between">
                      <p className="text-sm font-medium text-gray-900">{notification.message}</p>
                      {!notification.read && (
                        <button 
                          onClick={() => markAsRead(notification.id)}
                          className="text-xs text-blue-600 hover:text-blue-800"
                        >
                          Mark as read
                        </button>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
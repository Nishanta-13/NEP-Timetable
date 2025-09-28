import React from 'react';
// Dashboard View Component
const DashboardView = ({ studentData }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Dashboard Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="rounded-full bg-blue-100 p-3 mr-4">
              <i className="fas fa-book text-blue-500 text-xl"></i>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Enrolled Courses</p>
              <p className="text-2xl font-bold">{studentData.courses.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="rounded-full bg-green-100 p-3 mr-4">
              <i className="fas fa-user-check text-green-500 text-xl"></i>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Overall Attendance</p>
              <p className="text-2xl font-bold">92%</p>
            </div>
          </div>
        </div>
        
       
        
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="rounded-full bg-yellow-100 p-3 mr-4">
              <i className="fas fa-calendar-day text-yellow-500 text-xl"></i>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Upcoming Exams</p>
              <p className="text-2xl font-bold">2</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-medium text-lg mb-4">Recent Grades</h3>
          <div className="space-y-3">
            {studentData.courses.slice(0, 4).map(course => (
              <div key={course.id} className="flex justify-between items-center py-2 border-b border-gray-100">
                <div>
                  <p className="font-medium">{course.id} - {course.name}</p>
                  <p className="text-sm text-gray-500">{course.instructor}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${course.grade === 'A' ? 'bg-green-100 text-green-800' : course.grade.includes('A') ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'}`}>
                  {course.grade}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-medium text-lg mb-4">Today's Schedule</h3>
          <div className="space-y-4">
            {studentData.schedule.filter(item => item.day === "Monday").map((classItem, index) => (
              <div key={index} className="flex items-start">
                <div className="bg-blue-100 text-blue-800 text-xs font-medium py-1 px-2 rounded mr-3">
                  {classItem.time}
                </div>
                <div>
                  <p className="font-medium">{classItem.course}</p>
                  <p className="text-sm text-gray-500">{classItem.location}</p>
                </div>
              </div>
            ))}
            {studentData.schedule.filter(item => item.day === "Monday").length === 0 && (
              <p className="text-gray-500">No classes scheduled for today</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default DashboardView;
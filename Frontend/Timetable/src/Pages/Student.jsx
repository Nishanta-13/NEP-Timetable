import React, { useState } from 'react';
import Sidebar from '../Components/Student/SidebarStudent.jsx';
import Header from '../Components/Student/StudentHeader.jsx';
import DashboardView from '../Components/Student/StudentDashboard.jsx';
const StudentPortal = () => {
  const [activeView, setActiveView] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

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
    schedule: [
      { day: "Monday", time: "9:00 AM - 10:15 AM", course: "CS101", location: "Tech Building 202" },
      { day: "Monday", time: "1:30 PM - 2:45 PM", course: "MATH202", location: "Science Hall 105" },
      { day: "Tuesday", time: "10:30 AM - 11:45 AM", course: "PHYS150", location: "Physics Lab 3" },
      { day: "Wednesday", time: "9:00 AM - 10:15 AM", course: "CS101", location: "Tech Building 202" },
      { day: "Wednesday", time: "1:30 PM - 2:45 PM", course: "ENG101", location: "Humanities 307" },
      { day: "Thursday", time: "10:30 AM - 11:45 AM", course: "PHYS150", location: "Physics Lab 3" },
      { day: "Friday", time: "11:00 AM - 12:15 PM", course: "HIST110", location: "History Building 104" }
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

  // Render different views based on activeView state
  const renderActiveView = () => {
    switch(activeView) {
      case 'dashboard':
        return <DashboardView studentData={studentData} />;
      case 'schedule':
        return <ScheduleView schedule={studentData.schedule} />;
      case 'enrolled-courses':
        return <EnrolledCoursesView courses={studentData.courses} />;
      case 'course-plan':
        return <CoursePlanView coursePlan={studentData.coursePlan} />;
      case 'attendance':
        return <AttendanceView attendance={studentData.attendance} />;
      default:
        return <DashboardView studentData={studentData} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`${sidebarCollapsed ? 'w-20' : 'w-64'} transition-width duration-300`}>
        <Sidebar 
          isCollapsed={sidebarCollapsed} 
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
          activeView={activeView}
          setActiveView={setActiveView}
        />
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header studentData={studentData} />
        
        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {renderActiveView()}
        </main>
      </div>
    </div>
  );
};

// Sidebar Component


// Schedule View Component
const ScheduleView = ({ schedule }) => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  
  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Class Schedule</h2>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="grid grid-cols-6 border-b border-gray-200">
          <div className="p-3 font-medium bg-gray-50"></div>
          {days.map(day => (
            <div key={day} className="p-3 font-medium text-center bg-gray-50">{day}</div>
          ))}
        </div>
        
        {/* Simplified schedule grid - in a real app you'd have proper time slots */}
        <div className="p-4">
          {schedule.map((classItem, index) => (
            <div key={index} className="mb-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
              <div className="flex justify-between">
                <span className="font-medium">{classItem.course}</span>
                <span className="text-sm text-blue-700">{classItem.time}</span>
              </div>
              <div className="text-sm text-gray-600 mt-1">{classItem.location} | {classItem.day}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Enrolled Courses View Component
const EnrolledCoursesView = ({ courses }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Enrolled Courses</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
      </div>
    </div>
  );
};

// Course Plan View Component
const CoursePlanView = ({ coursePlan }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Course Plan</h2>
      
      <div className="space-y-6">
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
                    {data.percentage >= 90 ? 'Excellent' : data.percentage >= 75 ? 'Satisfactory' : 'Needs Improvement'}
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

export default StudentPortal;
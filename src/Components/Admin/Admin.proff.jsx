import React, { useState } from 'react';

const ProfessorView = ({ professors }) => {
  const [filter, setFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('professors');
  const [selectedProfessor, setSelectedProfessor] = useState(null);
  const [isPreferencesModalOpen, setIsPreferencesModalOpen] = useState(false);

  // Minimum teaching hours based on position
  const positionMinimumHours = {
    'Assistant Professor': 12,
    'Professor': 10,
    'HOD': 8,
    'Dean': 6,
    'Director': 4
  };

  // Sample course preferences data
  const professorPreferences = {
    1: {
      preferredCourses: [
        { code: 'CS301', name: 'Data Structures', priority: 1, status: 'pending' },
        { code: 'CS302', name: 'Algorithms', priority: 2, status: 'pending' },
        { code: 'CS401', name: 'Machine Learning', priority: 3, status: 'pending' }
      ],
      preferredWeeklyHours: 15,
      currentWeeklyHours: 12,
      position: 'Assistant Professor'
    },
    2: {
      preferredCourses: [
        { code: 'MATH301', name: 'Discrete Mathematics', priority: 1, status: 'approved' },
        { code: 'MATH302', name: 'Linear Algebra', priority: 2, status: 'pending' },
        { code: 'CS305', name: 'Database Systems', priority: 3, status: 'pending' }
      ],
      preferredWeeklyHours: 14,
      currentWeeklyHours: 16,
      position: 'Professor'
    },
    3: {
      preferredCourses: [
        { code: 'PHY401', name: 'Quantum Physics', priority: 1, status: 'approved' },
        { code: 'PHY301', name: 'Classical Mechanics', priority: 2, status: 'approved' }
      ],
      preferredWeeklyHours: 10,
      currentWeeklyHours: 8,
      position: 'HOD'
    },
    4: {
      preferredCourses: [
        { code: 'BUS501', name: 'Strategic Management', priority: 1, status: 'pending' },
        { code: 'BUS401', name: 'Organizational Behavior', priority: 2, status: 'pending' }
      ],
      preferredWeeklyHours: 8,
      currentWeeklyHours: 6,
      position: 'Dean'
    },
    5: {
      preferredCourses: [
        { code: 'CS601', name: 'Research Methodology', priority: 1, status: 'approved' }
      ],
      preferredWeeklyHours: 6,
      currentWeeklyHours: 4,
      position: 'Director'
    }
  };

  const filteredProfessors = professors.filter(professor => 
    filter === 'all' || professor.status.toLowerCase().replace(' ', '') === filter
  );

  const handleViewPreferences = (professor) => {
    setSelectedProfessor(professor);
    setIsPreferencesModalOpen(true);
  };

  const handleApproveCourse = (professorId, courseCode) => {
    console.log(`Approved course ${courseCode} for professor ${professorId}`);
    alert(`Course ${courseCode} approved for ${professors.find(p => p.id === professorId)?.name}`);
  };

  const handleRejectCourse = (professorId, courseCode) => {
    console.log(`Rejected course ${courseCode} for professor ${professorId}`);
    alert(`Course ${courseCode} rejected for ${professors.find(p => p.id === professorId)?.name}`);
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      'approved': { color: 'green', text: 'Approved' },
      'pending': { color: 'yellow', text: 'Pending' },
      'rejected': { color: 'red', text: 'Rejected' }
    };
    
    const config = statusConfig[status] || { color: 'gray', text: status };
    return `bg-${config.color}-100 text-${config.color}-800`;
  };

  const getHoursStatus = (professorId) => {
    const preferences = professorPreferences[professorId];
    if (!preferences) return 'unknown';
    
    const minHours = positionMinimumHours[preferences.position] || 0;
    const currentHours = preferences.currentWeeklyHours;
    
    if (currentHours >= minHours) return 'sufficient';
    if (currentHours >= minHours * 0.7) return 'warning';
    return 'insufficient';
  };

  const getHoursBadge = (professorId) => {
    const status = getHoursStatus(professorId);
    const config = {
      sufficient: { color: 'green', text: 'Sufficient Hours' },
      warning: { color: 'yellow', text: 'Low Hours' },
      insufficient: { color: 'red', text: 'Insufficient Hours' },
      unknown: { color: 'gray', text: 'No Data' }
    };
    
    return `bg-${config[status].color}-100 text-${config[status].color}-800`;
  };

  // Mobile responsive card view for professors
  const ProfessorCard = ({ professor }) => {
    const preferences = professorPreferences[professor.id];
    const minHours = positionMinimumHours[preferences?.position] || 0;
    
    return (
      <div 
        className="bg-white rounded-lg shadow p-4 mb-4 border border-gray-200 cursor-pointer hover:shadow-md transition-shadow"
        onClick={() => handleViewPreferences(professor)}
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center">
            <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center mr-3">
              <span className="text-gray-600 font-medium">
                {professor.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-900">{professor.name}</div>
              <div className="text-xs text-gray-500">{professor.email}</div>
            </div>
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            professor.status === 'Active' 
              ? 'bg-blue-100 text-blue-800' 
              : 'bg-yellow-100 text-yellow-800'
          }`}>
            {professor.status}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm mb-3">
          <div>
            <div className="text-gray-500">Position</div>
            <div className="font-medium">{preferences?.position || 'Not Specified'}</div>
          </div>
          <div>
            <div className="text-gray-500">Department</div>
            <div className="font-medium">{professor.department}</div>
          </div>
          <div>
            <div className="text-gray-500">Teaching Hours</div>
            <div className="font-medium">{preferences?.currentWeeklyHours || 0}h / {minHours}h min</div>
          </div>
          <div>
            <div className="text-gray-500">Office</div>
            <div className="font-medium">{professor.office}</div>
          </div>
        </div>

        <div className="flex justify-between items-center pt-3 border-t border-gray-200">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getHoursBadge(professor.id)}`}>
            {getHoursStatus(professor.id) === 'sufficient' ? '✓ Sufficient' : 
             getHoursStatus(professor.id) === 'warning' ? '⚠ Low' : 
             getHoursStatus(professor.id) === 'insufficient' ? '✗ Insufficient' : 'No Data'}
          </span>
          <div className="text-blue-600 text-sm font-medium flex items-center">
            View Details
            <i className="fas fa-chevron-right ml-1 text-xs"></i>
          </div>
        </div>
      </div>
    );
  };

  // Mobile responsive card view for courses
  const CoursePreferenceCard = ({ professor }) => {
    const preferences = professorPreferences[professor.id];
    const minHours = positionMinimumHours[preferences?.position] || 0;
    const approvedCourses = preferences?.preferredCourses.filter(c => c.status === 'approved').length || 0;
    const pendingCourses = preferences?.preferredCourses.filter(c => c.status === 'pending').length || 0;
    
    return (
      <div 
        className="bg-white rounded-lg shadow p-4 mb-4 border border-gray-200 cursor-pointer hover:shadow-md transition-shadow"
        onClick={() => handleViewPreferences(professor)}
      >
        <div className="mb-3">
          <div className="text-sm font-medium text-gray-900">{professor.name}</div>
          <div className="text-xs text-gray-500">{professor.department} • {preferences?.position}</div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="text-center bg-blue-50 rounded-lg p-2">
            <div className="text-xs text-blue-600 font-medium">Min Hours</div>
            <div className="text-sm font-bold text-blue-800">{minHours}h</div>
          </div>
          <div className="text-center bg-green-50 rounded-lg p-2">
            <div className="text-xs text-green-600 font-medium">Current</div>
            <div className="text-sm font-bold text-green-800">{preferences?.currentWeeklyHours || 0}h</div>
          </div>
          <div className="text-center bg-purple-50 rounded-lg p-2">
            <div className="text-xs text-purple-600 font-medium">Preferred</div>
            <div className="text-sm font-bold text-purple-800">{preferences?.preferredWeeklyHours || 0}h</div>
          </div>
          <div className="text-center bg-gray-50 rounded-lg p-2">
            <div className="text-xs text-gray-600 font-medium">Courses</div>
            <div className="text-sm font-bold text-gray-800">{preferences?.preferredCourses?.length || 0}</div>
          </div>
        </div>

        <div className="flex justify-between items-center pt-3 border-t border-gray-200">
          <div className="flex space-x-1">
            {approvedCourses > 0 && (
              <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
                {approvedCourses} Approved
              </span>
            )}
            {pendingCourses > 0 && (
              <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                {pendingCourses} Pending
              </span>
            )}
          </div>
          <div className="text-blue-600 text-sm font-medium flex items-center">
            Manage
            <i className="fas fa-chevron-right ml-1 text-xs"></i>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-6">
        <div>
          <h2 className="text-xl lg:text-2xl font-semibold text-gray-900">Professor Management</h2>
          <p className="text-sm text-gray-600 mt-1">
            Manage professor profiles, course preferences, and teaching assignments
          </p>
        </div>
        <button className="mt-4 lg:mt-0 bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center justify-center hover:bg-blue-700 w-full lg:w-auto">
          <i className="fas fa-plus mr-2"></i> Add Professor
        </button>
      </div>

      {/* Main Tabs */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex overflow-x-auto">
            {['professors', 'courses'].map((tab) => (
              <button
                key={tab}
                className={`flex-1 lg:flex-none lg:mr-8 py-4 px-1 text-sm font-medium border-b-2 whitespace-nowrap ${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {activeTab === 'professors' ? (
        <>
          {/* Filter Tabs */}
          <div className="bg-white rounded-lg shadow mb-6">
            <div className="border-b border-gray-200">
              <nav className="flex overflow-x-auto">
                {['all', 'active', 'onleave'].map((tab) => (
                  <button
                    key={tab}
                    className={`flex-1 lg:flex-none lg:mr-8 py-4 px-1 text-sm font-medium border-b-2 whitespace-nowrap ${
                      filter === tab
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                    onClick={() => setFilter(tab)}
                  >
                    {tab === 'onleave' ? 'On Leave' : tab.charAt(0).toUpperCase() + tab.slice(1)} 
                    <span className="hidden sm:inline"> Professors</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Professors Table - Desktop */}
          <div className="hidden lg:block bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Professor</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teaching Hours</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Office</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProfessors.map((professor) => {
                  const preferences = professorPreferences[professor.id];
                  const minHours = positionMinimumHours[preferences?.position] || 0;
                  
                  return (
                    <tr 
                      key={professor.id} 
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => handleViewPreferences(professor)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                            <span className="text-gray-600 font-medium">
                              {professor.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{professor.name}</div>
                            <div className="text-sm text-gray-500">{professor.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {preferences?.position || 'Not Specified'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {professor.department}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col">
                          <div className="text-sm font-medium text-gray-900">
                            {preferences?.currentWeeklyHours || 0}h / {minHours}h min
                          </div>
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getHoursBadge(professor.id)}`}>
                            {getHoursStatus(professor.id) === 'sufficient' ? '✓ Sufficient' : 
                             getHoursStatus(professor.id) === 'warning' ? '⚠ Low' : 
                             getHoursStatus(professor.id) === 'insufficient' ? '✗ Insufficient' : 'No Data'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          professor.status === 'Active' 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {professor.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {professor.office}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Professors Cards - Mobile */}
          <div className="lg:hidden space-y-4">
            {filteredProfessors.map((professor) => (
              <ProfessorCard key={professor.id} professor={professor} />
            ))}
          </div>
        </>
      ) : (
        /* Courses Tab */
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-4 lg:p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold">Course Assignment Preferences</h3>
            <p className="text-sm text-gray-600 mt-1">
              Manage professor course preferences and teaching hour requirements
            </p>
          </div>
          
          {/* Courses Table - Desktop */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Professor</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Min Hours</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Hours</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preferred Hours</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preferred Courses</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {professors.map((professor) => {
                  const preferences = professorPreferences[professor.id];
                  const minHours = positionMinimumHours[preferences?.position] || 0;
                  const approvedCourses = preferences?.preferredCourses.filter(c => c.status === 'approved').length || 0;
                  const pendingCourses = preferences?.preferredCourses.filter(c => c.status === 'pending').length || 0;
                  
                  return (
                    <tr 
                      key={professor.id} 
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => handleViewPreferences(professor)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{professor.name}</div>
                        <div className="text-sm text-gray-500">{professor.department}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {preferences?.position || 'Not Specified'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {minHours}h
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`text-sm font-medium ${
                          (preferences?.currentWeeklyHours || 0) >= minHours 
                            ? 'text-green-600' 
                            : (preferences?.currentWeeklyHours || 0) >= minHours * 0.7 
                              ? 'text-yellow-600' 
                              : 'text-red-600'
                        }`}>
                          {preferences?.currentWeeklyHours || 0}h
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {preferences?.preferredWeeklyHours || 0}h
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col space-y-1">
                          <div className="flex space-x-1">
                            {approvedCourses > 0 && (
                              <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
                                {approvedCourses} Approved
                              </span>
                            )}
                            {pendingCourses > 0 && (
                              <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                                {pendingCourses} Pending
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-gray-500">
                            {preferences?.preferredCourses?.length || 0} total preferences
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getHoursBadge(professor.id)}`}>
                          {getHoursStatus(professor.id) === 'sufficient' ? 'Sufficient' : 
                           getHoursStatus(professor.id) === 'warning' ? 'Low Hours' : 
                           getHoursStatus(professor.id) === 'insufficient' ? 'Insufficient' : 'No Data'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Courses Cards - Mobile */}
          <div className="lg:hidden p-4 space-y-4">
            {professors.map((professor) => (
              <CoursePreferenceCard key={professor.id} professor={professor} />
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredProfessors.length === 0 && activeTab === 'professors' && (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <i className="fas fa-users text-gray-400 text-4xl mb-3"></i>
          <p className="text-gray-500 text-lg">No professors found</p>
          <p className="text-gray-400 text-sm mt-1">
            Try adjusting your filters or add new professors
          </p>
        </div>
      )}

      {/* Professor Preferences Modal - Responsive */}
      {isPreferencesModalOpen && selectedProfessor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 lg:p-4">
          <div className="bg-white rounded-lg w-full max-w-6xl max-h-[95vh] lg:max-h-[90vh] overflow-auto">
            <div className="p-4 lg:p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg lg:text-xl font-semibold">{selectedProfessor.name}'s Course Preferences</h3>
                  <p className="text-sm text-gray-600">
                    {selectedProfessor.department} • {professorPreferences[selectedProfessor.id]?.position}
                  </p>
                </div>
                <button
                  onClick={() => setIsPreferencesModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600 text-xl lg:text-2xl"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
            </div>

            <div className="p-4 lg:p-6">
              {/* Teaching Hours Summary */}
              <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
                <div className="bg-blue-50 rounded-lg p-3 lg:p-4">
                  <div className="text-xs lg:text-sm text-blue-600 font-medium">Minimum Required Hours</div>
                  <div className="text-xl lg:text-2xl font-bold text-blue-800">
                    {positionMinimumHours[professorPreferences[selectedProfessor.id]?.position] || 0}h
                  </div>
                  <div className="text-xs text-blue-600">Based on position</div>
                </div>
                <div className="bg-green-50 rounded-lg p-3 lg:p-4">
                  <div className="text-xs lg:text-sm text-green-600 font-medium">Current Teaching Hours</div>
                  <div className="text-xl lg:text-2xl font-bold text-green-800">
                    {professorPreferences[selectedProfessor.id]?.currentWeeklyHours || 0}h
                  </div>
                  <div className="text-xs text-green-600">This semester</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-3 lg:p-4">
                  <div className="text-xs lg:text-sm text-purple-600 font-medium">Preferred Hours</div>
                  <div className="text-xl lg:text-2xl font-bold text-purple-800">
                    {professorPreferences[selectedProfessor.id]?.preferredWeeklyHours || 0}h
                  </div>
                  <div className="text-xs text-purple-600">Professor's preference</div>
                </div>
              </div>

              <h4 className="text-lg font-semibold mb-4">Preferred Courses</h4>
              
              <div className="space-y-3">
                {professorPreferences[selectedProfessor.id]?.preferredCourses.map((course, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-3 lg:p-4 hover:bg-gray-50">
                    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-2">
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center mb-1 gap-2">
                          <span className="font-bold text-base lg:text-lg text-gray-900">
                            {course.code}
                          </span>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusBadge(course.status)}`}>
                            {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
                          </span>
                          <span className="text-sm text-gray-500">
                            Priority: #{course.priority}
                          </span>
                        </div>
                        <p className="text-gray-700 text-sm lg:text-base">{course.name}</p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mt-3">
                      <div className="text-sm text-gray-500">
                        {course.status === 'pending' && (
                          <span className="text-yellow-600">
                            <i className="fas fa-clock mr-1"></i>
                            Awaiting approval
                          </span>
                        )}
                        {course.status === 'approved' && (
                          <span className="text-green-600">
                            <i className="fas fa-check-circle mr-1"></i>
                            Approved for assignment
                          </span>
                        )}
                        {course.status === 'rejected' && (
                          <span className="text-red-600">
                            <i className="fas fa-times-circle mr-1"></i>
                            Not approved
                          </span>
                        )}
                      </div>
                      
                      {course.status === 'pending' && (
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleApproveCourse(selectedProfessor.id, course.code)}
                            className="flex-1 sm:flex-none bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700 text-sm font-medium"
                          >
                            <i className="fas fa-check mr-1"></i> Approve
                          </button>
                          <button
                            onClick={() => handleRejectCourse(selectedProfessor.id, course.code)}
                            className="flex-1 sm:flex-none bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700 text-sm font-medium"
                          >
                            <i className="fas fa-times mr-1"></i> Reject
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {(!professorPreferences[selectedProfessor.id]?.preferredCourses || professorPreferences[selectedProfessor.id].preferredCourses.length === 0) && (
                <div className="text-center py-8">
                  <i className="fas fa-book text-gray-400 text-4xl mb-3"></i>
                  <p className="text-gray-500">No course preferences submitted yet</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfessorView;
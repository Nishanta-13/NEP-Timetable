import React, { useState, useEffect } from 'react';

const StudentView = ({ students }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [yearFilter, setYearFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isPreferencesModalOpen, setIsPreferencesModalOpen] = useState(false);
  const [studentPreferences, setStudentPreferences] = useState({});
  const [approvedSubjects, setApprovedSubjects] = useState({});

  // Initialize student preferences and approved subjects
  useEffect(() => {
    const initialPreferences = {};
    const initialApproved = {};
    
    students.forEach(student => {
      initialPreferences[student.id] = [
        { code: 'CS301', name: 'Data Structures', status: 'pending', priority: 1 },
        { code: 'CS302', name: 'Algorithms', status: 'pending', priority: 2 },
        { code: 'MATH301', name: 'Discrete Mathematics', status: 'pending', priority: 3 },
        { code: 'CS305', name: 'Database Systems', status: 'pending', priority: 4 }
      ];
      initialApproved[student.id] = [];
    });
    
    setStudentPreferences(initialPreferences);
    setApprovedSubjects(initialApproved);
  }, [students]);

  // Get unique departments and years for filters
  const departments = [...new Set(students.map(student => student.department))];
  const years = [...new Set(students.map(student => student.year))];

  const filteredStudents = students.filter(student => {
    // Convert all searchable fields to strings for safe comparison
    const studentName = student.name?.toString().toLowerCase() || '';
    const studentEmail = student.email?.toString().toLowerCase() || '';
    const studentId = student.id?.toString().toLowerCase() || '';
    
    const searchTermLower = searchTerm.toLowerCase();
    
    const matchesSearch = studentName.includes(searchTermLower) ||
                         studentEmail.includes(searchTermLower) ||
                         studentId.includes(searchTermLower);
    const matchesYear = yearFilter === 'all' || student.year === yearFilter;
    const matchesDepartment = departmentFilter === 'all' || student.department === departmentFilter;
    
    return matchesSearch && matchesYear && matchesDepartment;
  });

  const handleViewPreferences = (student) => {
    setSelectedStudent(student);
    setIsPreferencesModalOpen(true);
  };

  const handleApproveSubject = (studentId, subjectCode) => {
    setStudentPreferences(prev => {
      const updatedPreferences = { ...prev };
      updatedPreferences[studentId] = updatedPreferences[studentId].map(subject =>
        subject.code === subjectCode 
          ? { ...subject, status: 'approved' }
          : subject
      );
      return updatedPreferences;
    });

    // Add to approved subjects list
    setApprovedSubjects(prev => {
      const studentPreferencesList = studentPreferences[studentId] || [];
      const approvedSubject = studentPreferencesList.find(subject => subject.code === subjectCode);
      
      if (approvedSubject) {
        return {
          ...prev,
          [studentId]: [...(prev[studentId] || []), { ...approvedSubject, status: 'approved' }]
        };
      }
      return prev;
    });

    // Show success message
    const studentName = students.find(s => s.id === studentId)?.name;
    alert(`Subject ${subjectCode} approved for ${studentName}`);
  };

  const handleRejectSubject = (studentId, subjectCode) => {
    setStudentPreferences(prev => {
      const updatedPreferences = { ...prev };
      updatedPreferences[studentId] = updatedPreferences[studentId].map(subject =>
        subject.code === subjectCode 
          ? { ...subject, status: 'rejected' }
          : subject
      );
      return updatedPreferences;
    });

    // Remove from approved subjects if it was previously approved
    setApprovedSubjects(prev => ({
      ...prev,
      [studentId]: (prev[studentId] || []).filter(subject => subject.code !== subjectCode)
    }));

    const studentName = students.find(s => s.id === studentId)?.name;
    alert(`Subject ${subjectCode} rejected for ${studentName}`);
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

  const getApprovedSubjectsCount = (studentId) => {
    return approvedSubjects[studentId]?.length || 0;
  };

  const getPendingSubjectsCount = (studentId) => {
    return studentPreferences[studentId]?.filter(subject => subject.status === 'pending').length || 0;
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Student Management</h2>
        <button className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-green-700">
          <i className="fas fa-plus mr-2"></i> Add Student
        </button>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search Bar */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Students
            </label>
            <div className="relative">
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search by name, email, or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
            </div>
          </div>

          {/* Year Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Year
            </label>
            <select
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={yearFilter}
              onChange={(e) => setYearFilter(e.target.value)}
            >
              <option value="all">All Years</option>
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>

          {/* Department Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Department
            </label>
            <select
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
            >
              <option value="all">All Departments</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mt-4 flex justify-between items-center">
          <div className="text-sm text-gray-600">
            Showing {filteredStudents.length} of {students.length} students
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={() => {
                setSearchTerm('');
                setYearFilter('all');
                setDepartmentFilter('all');
              }}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">GPA</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preferred Subjects</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredStudents.map((student) => {
              const approvedCount = getApprovedSubjectsCount(student.id);
              const pendingCount = getPendingSubjectsCount(student.id);
              const totalCount = studentPreferences[student.id]?.length || 0;
              
              return (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                        <span className="text-gray-600 font-medium">
                          {student.name?.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{student.name}</div>
                        <div className="text-sm text-gray-500">{student.email}</div>
                        <div className="text-xs text-gray-400">{student.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {student.department}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {student.year}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      student.status === 'Active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className={`font-medium ${
                      student.gpa >= 3.5 ? 'text-green-600' : 
                      student.gpa >= 3.0 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {student.gpa}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col space-y-1">
                      <div className="flex space-x-1">
                        {approvedCount > 0 && (
                          <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
                            <i className="fas fa-check mr-1"></i>
                            {approvedCount} Approved
                          </span>
                        )}
                        {pendingCount > 0 && (
                          <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                            <i className="fas fa-clock mr-1"></i>
                            {pendingCount} Pending
                          </span>
                        )}
                        {approvedCount === 0 && pendingCount === 0 && (
                          <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-800">
                            No Preferences
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-gray-500">
                        {totalCount} total subjects
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button 
                      onClick={() => handleViewPreferences(student)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      View Preferences
                    </button>
                    <button className="text-gray-600 hover:text-gray-900">Edit</button>
                    <button className="text-red-600 hover:text-red-900">Delete</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {filteredStudents.length === 0 && (
          <div className="text-center py-12">
            <i className="fas fa-search text-gray-400 text-4xl mb-3"></i>
            <p className="text-gray-500 text-lg">No students found</p>
            <p className="text-gray-400 text-sm mt-1">
              Try adjusting your search terms or filters
            </p>
          </div>
        )}
      </div>

      {/* Student Preferences Modal */}
      {isPreferencesModalOpen && selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] overflow-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-semibold">{selectedStudent.name}'s Subject Preferences</h3>
                  <p className="text-sm text-gray-600">
                    {selectedStudent.department} • {selectedStudent.year} • GPA: {selectedStudent.gpa}
                  </p>
                </div>
                <button
                  onClick={() => setIsPreferencesModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
            </div>

            <div className="p-6">
              {/* Summary Cards */}
              <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {studentPreferences[selectedStudent.id]?.length || 0}
                  </div>
                  <div className="text-sm text-blue-800">Total Preferences</div>
                </div>
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {getApprovedSubjectsCount(selectedStudent.id)}
                  </div>
                  <div className="text-sm text-green-800">Approved</div>
                </div>
                <div className="bg-yellow-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-yellow-600">
                    {getPendingSubjectsCount(selectedStudent.id)}
                  </div>
                  <div className="text-sm text-yellow-800">Pending Review</div>
                </div>
                <div className="bg-red-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-red-600">
                    {studentPreferences[selectedStudent.id]?.filter(p => p.status === 'rejected').length || 0}
                  </div>
                  <div className="text-sm text-red-800">Rejected</div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Preferred Subjects Section */}
                <div>
                  <h4 className="text-lg font-semibold mb-4">Preferred Subjects</h4>
                  
                  <div className="space-y-3">
                    {studentPreferences[selectedStudent.id]?.map((subject, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex-1">
                            <div className="flex items-center mb-1">
                              <span className="font-bold text-lg text-gray-900 mr-3">
                                {subject.code}
                              </span>
                              <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusBadge(subject.status)}`}>
                                {subject.status.charAt(0).toUpperCase() + subject.status.slice(1)}
                              </span>
                            </div>
                            <p className="text-gray-700 text-sm mb-1">{subject.name}</p>
                            <p className="text-xs text-gray-500">Priority: #{subject.priority}</p>
                          </div>
                        </div>

                        <div className="flex justify-between items-center mt-3">
                          <div className="text-sm text-gray-500">
                            {subject.status === 'pending' && (
                              <span className="text-yellow-600">
                                <i className="fas fa-clock mr-1"></i>
                                Awaiting approval
                              </span>
                            )}
                            {subject.status === 'approved' && (
                              <span className="text-green-600">
                                <i className="fas fa-check-circle mr-1"></i>
                                Approved for enrollment
                              </span>
                            )}
                            {subject.status === 'rejected' && (
                              <span className="text-red-600">
                                <i className="fas fa-times-circle mr-1"></i>
                                Not approved
                              </span>
                            )}
                          </div>
                          
                          {subject.status === 'pending' && (
                            <div className="space-x-2">
                              <button
                                onClick={() => handleApproveSubject(selectedStudent.id, subject.code)}
                                className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-sm font-medium"
                              >
                                <i className="fas fa-check mr-1"></i> Approve
                              </button>
                              <button
                                onClick={() => handleRejectSubject(selectedStudent.id, subject.code)}
                                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm font-medium"
                              >
                                <i className="fas fa-times mr-1"></i> Reject
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Approved Subjects Section */}
                <div>
                  <h4 className="text-lg font-semibold mb-4">Approved Subjects</h4>
                  
                  <div className="space-y-3">
                    {approvedSubjects[selectedStudent.id]?.length > 0 ? (
                      approvedSubjects[selectedStudent.id].map((subject, index) => (
                        <div key={index} className="border border-green-200 bg-green-50 rounded-lg p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="flex items-center mb-1">
                                <span className="font-bold text-lg text-green-900 mr-3">
                                  {subject.code}
                                </span>
                                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                                  Approved
                                </span>
                              </div>
                              <p className="text-green-800 text-sm mb-1">{subject.name}</p>
                              <p className="text-xs text-green-600">Priority: #{subject.priority}</p>
                            </div>
                            <i className="fas fa-check-circle text-green-500 text-xl"></i>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                        <i className="fas fa-clipboard-check text-gray-400 text-3xl mb-2"></i>
                        <p className="text-gray-500">No approved subjects yet</p>
                        <p className="text-gray-400 text-sm mt-1">Approve subjects from the preferences list</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {(!studentPreferences[selectedStudent.id] || studentPreferences[selectedStudent.id].length === 0) && (
                <div className="text-center py-8">
                  <i className="fas fa-book text-gray-400 text-4xl mb-3"></i>
                  <p className="text-gray-500">No subject preferences submitted yet</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentView;
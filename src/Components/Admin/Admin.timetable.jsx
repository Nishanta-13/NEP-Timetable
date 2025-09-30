import React, { useState } from 'react';

const TimetableView = () => {
    const [currentStep, setCurrentStep] = useState('departments');
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [selectedSemester, setSelectedSemester] = useState(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [isTimetableModalOpen, setIsTimetableModalOpen] = useState(false);
    const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'
    const [sharingTimetable, setSharingTimetable] = useState(null);
    const [editingTimetable, setEditingTimetable] = useState(null);
    const [viewingTimetable, setViewingTimetable] = useState(null);
    const [draggingSlot, setDraggingSlot] = useState(null);
    const [isEditingMode, setIsEditingMode] = useState(false);
    const [newTimetable, setNewTimetable] = useState({
        name: '',
        description: '',
        status: 'Draft'
    });
    const [shareSettings, setShareSettings] = useState({
        students: true,
        faculty: true,
        public: false,
        expirationDate: ''
    });

    // Sample data
    const departments = [
        { id: 1, name: 'Computer Science', code: 'CS', facultyCount: 24, studentCount: 452 },
        { id: 2, name: 'Mathematics', code: 'MATH', facultyCount: 18, studentCount: 287 },
        { id: 3, name: 'Physics', code: 'PHY', facultyCount: 16, studentCount: 198 },
        { id: 4, name: 'Engineering', code: 'ENG', facultyCount: 32, studentCount: 567 },
        { id: 5, name: 'Business Administration', code: 'BUS', facultyCount: 28, studentCount: 623 },
        { id: 6, name: 'Chemistry', code: 'CHEM', facultyCount: 14, studentCount: 156 }
    ];

    const semesters = [
        { id: 1, name: 'Fall 2024', code: 'F24', startDate: '2024-09-01', endDate: '2024-12-20' },
        { id: 2, name: 'Spring 2024', code: 'S24', startDate: '2024-01-15', endDate: '2024-05-10' },
        { id: 3, name: 'Summer 2024', code: 'SUM24', startDate: '2024-06-01', endDate: '2024-08-15' },
        { id: 4, name: 'Fall 2023', code: 'F23', startDate: '2023-09-01', endDate: '2023-12-20' }
    ];

    // Time slots for the timetable grid
    const timeSlots = [
        '8:00-9:00', '9:00-10:00', '10:00-11:00', '11:00-12:00',
        '12:00-13:00', '13:00-14:00', '14:00-15:00', '15:00-16:00', '16:00-17:00'
    ];

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

    const [timetables, setTimetables] = useState([
        {
            id: 1,
            name: "Fall 2024 - Computer Science",
            department: "Computer Science",
            semester: "Fall 2024",
            status: "Active",
            generatedDate: "2024-08-15",
            frozen: true,
            shared: true,
            description: "Main timetable for Computer Science department - Fall 2024",
            schedule: {
                'Monday': {
                    '8:00-9:00': null,
                    '9:00-10:00': { code: "CS101", name: "Intro to Programming", instructor: "Dr. Robert Chen", room: "Room 101" },
                    '10:00-11:00': { code: "CS101", name: "Intro to Programming", instructor: "Dr. Robert Chen", room: "Room 101" },
                    '11:00-12:00': null,
                    '12:00-13:00': null,
                    '13:00-14:00': { code: "MATH201", name: "Calculus", instructor: "Dr. Maria Garcia", room: "Room 205" },
                    '14:00-15:00': { code: "MATH201", name: "Calculus", instructor: "Dr. Maria Garcia", room: "Room 205" },
                    '15:00-16:00': null,
                    '16:00-17:00': null
                },
                'Tuesday': {
                    '8:00-9:00': null,
                    '9:00-10:00': null,
                    '10:00-11:00': { code: "PHY301", name: "Physics Lab", instructor: "Prof. James Wilson", room: "Lab 3" },
                    '11:00-12:00': { code: "PHY301", name: "Physics Lab", instructor: "Prof. James Wilson", room: "Lab 3" },
                    '12:00-13:00': null,
                    '13:00-14:00': null,
                    '14:00-15:00': { code: "CS301", name: "Data Structures", instructor: "Dr. Lisa Thompson", room: "Room 301" },
                    '15:00-16:00': { code: "CS301", name: "Data Structures", instructor: "Dr. Lisa Thompson", room: "Room 301" },
                    '16:00-17:00': null
                },
                'Wednesday': {
                    '8:00-9:00': null,
                    '9:00-10:00': { code: "CS101", name: "Intro to Programming", instructor: "Dr. Robert Chen", room: "Room 101" },
                    '10:00-11:00': { code: "CS101", name: "Intro to Programming", instructor: "Dr. Robert Chen", room: "Room 101" },
                    '11:00-12:00': null,
                    '12:00-13:00': null,
                    '13:00-14:00': { code: "MATH201", name: "Calculus", instructor: "Dr. Maria Garcia", room: "Room 205" },
                    '14:00-15:00': { code: "MATH201", name: "Calculus", instructor: "Dr. Maria Garcia", room: "Room 205" },
                    '15:00-16:00': null,
                    '16:00-17:00': null
                },
                'Thursday': {
                    '8:00-9:00': null,
                    '9:00-10:00': null,
                    '10:00-11:00': { code: "PHY301", name: "Physics Lab", instructor: "Prof. James Wilson", room: "Lab 3" },
                    '11:00-12:00': { code: "PHY301", name: "Physics Lab", instructor: "Prof. James Wilson", room: "Lab 3" },
                    '12:00-13:00': null,
                    '13:00-14:00': null,
                    '14:00-15:00': { code: "CS301", name: "Data Structures", instructor: "Dr. Lisa Thompson", room: "Room 301" },
                    '15:00-16:00': { code: "CS301", name: "Data Structures", instructor: "Dr. Lisa Thompson", room: "Room 301" },
                    '16:00-17:00': null
                },
                'Friday': {
                    '8:00-9:00': null,
                    '9:00-10:00': { code: "CS450", name: "Advanced Algorithms", instructor: "Dr. Sarah Johnson", room: "Room 410" },
                    '10:00-11:00': { code: "CS450", name: "Advanced Algorithms", instructor: "Dr. Sarah Johnson", room: "Room 410" },
                    '11:00-12:00': null,
                    '12:00-13:00': null,
                    '13:00-14:00': null,
                    '14:00-15:00': null,
                    '15:00-16:00': null,
                    '16:00-17:00': null
                }
            }
        },
        {
            id: 2,
            name: "Spring 2024 - Computer Science",
            department: "Computer Science",
            semester: "Spring 2024",
            status: "Archived",
            generatedDate: "2024-01-10",
            frozen: true,
            shared: false,
            description: "Previous semester timetable for Computer Science",
            schedule: {
                'Monday': {
                    '8:00-9:00': null,
                    '9:00-10:00': { code: "CS201", name: "Discrete Math", instructor: "Dr. Lisa Thompson", room: "Room 201" },
                    '10:00-11:00': { code: "CS201", name: "Discrete Math", instructor: "Dr. Lisa Thompson", room: "Room 201" },
                    '11:00-12:00': null,
                    '12:00-13:00': null,
                    '13:00-14:00': null,
                    '14:00-15:00': null,
                    '15:00-16:00': null,
                    '16:00-17:00': null
                },
                // ... other days with similar structure
            }
        },
        {
            id: 3,
            name: "Summer 2024 - Computer Science",
            department: "Computer Science",
            semester: "Summer 2024",
            status: "Draft",
            generatedDate: "2024-05-20",
            frozen: false,
            shared: false,
            description: "Draft timetable for Summer session",
            schedule: {
                'Monday': {
                    '8:00-9:00': null,
                    '9:00-10:00': { code: "CS202", name: "Web Development", instructor: "Dr. Sarah Johnson", room: "Lab 2" },
                    '10:00-11:00': { code: "CS202", name: "Web Development", instructor: "Dr. Sarah Johnson", room: "Lab 2" },
                    '11:00-12:00': null,
                    '12:00-13:00': null,
                    '13:00-14:00': null,
                    '14:00-15:00': null,
                    '15:00-16:00': null,
                    '16:00-17:00': null
                },
                // ... other days with similar structure
            }
        }
    ]);

    const handleDepartmentSelect = (department) => {
        setSelectedDepartment(department);
        setCurrentStep('semester');
    };

    const handleSemesterSelect = (semester) => {
        setSelectedSemester(semester);
        setCurrentStep('timetable');
    };

    const handleBackToDepartments = () => {
        setSelectedDepartment(null);
        setSelectedSemester(null);
        setCurrentStep('departments');
    };

    const handleBackToSemester = () => {
        setSelectedSemester(null);
        setCurrentStep('semester');
    };

    const handleCreateTimetable = () => {
        console.log('Creating new timetable:', newTimetable);
        setIsCreateModalOpen(false);
        setNewTimetable({ name: '', description: '', status: 'Draft' });
    };

    const handleEditTimetable = (timetable) => {
        if (timetable.frozen) {
            alert('This timetable is frozen and cannot be edited.');
            return;
        }
        setEditingTimetable(timetable);
        setIsEditModalOpen(true);
    };

    const handleSaveEdit = () => {
        if (editingTimetable.frozen) {
            alert('This timetable is frozen and cannot be edited.');
            return;
        }
        console.log('Saving timetable:', editingTimetable);
        setIsEditModalOpen(false);
        setEditingTimetable(null);
    };

    const handleFreezeTimetable = (id) => {
        const timetable = timetables.find(t => t.id === id);
        if (timetable && timetable.frozen) {
            alert('This timetable is already frozen and cannot be unfrozen. Frozen timetables are permanent.');
            return;
        }

        if (window.confirm('Are you sure you want to freeze this timetable? This action is PERMANENT and cannot be undone.')) {
            setTimetables(timetables.map(timetable =>
                timetable.id === id
                    ? { ...timetable, frozen: true }
                    : timetable
            ));
            alert('Timetable has been frozen permanently. It can no longer be edited or deleted. You can now share it with others.');
        }
    };

    const handleDeleteTimetable = (id) => {
        const timetable = timetables.find(t => t.id === id);
        if (timetable && timetable.frozen) {
            alert('This timetable is frozen and cannot be deleted.');
            return;
        }
        if (window.confirm('Are you sure you want to delete this timetable?')) {
            setTimetables(timetables.filter(t => t.id !== id));
        }
    };

    const handleShareTimetable = (timetable) => {
        if (!timetable.frozen) {
            alert('This timetable must be frozen before it can be shared. Please freeze the timetable first to make it available for sharing.');
            return;
        }

        // Check if any other timetable is already shared
        const alreadyShared = timetables.find(t => t.shared && t.id !== timetable.id);
        if (alreadyShared) {
            alert(`Only one timetable can be shared at a time. "${alreadyShared.name}" is currently shared. Please unshare it first.`);
            return;
        }

        setSharingTimetable(timetable);
        setIsShareModalOpen(true);
    };

    const handleSaveShare = () => {
        if (sharingTimetable) {
            setTimetables(timetables.map(t =>
                t.id === sharingTimetable.id
                    ? { ...t, shared: true }
                    : { ...t, shared: false } // Unshare all others
            ));
            alert(`Timetable "${sharingTimetable.name}" has been shared successfully! All other timetables have been unshared.`);
            setIsShareModalOpen(false);
            setSharingTimetable(null);
            setShareSettings({
                students: true,
                faculty: true,
                public: false,
                expirationDate: ''
            });
        }
    };

    const handleUnshareTimetable = (id) => {
        const timetable = timetables.find(t => t.id === id);
        if (window.confirm(`Are you sure you want to stop sharing "${timetable?.name}"?`)) {
            setTimetables(timetables.map(t =>
                t.id === id
                    ? { ...t, shared: false }
                    : t
            ));
            alert('Timetable has been unshared.');
        }
    };

    const handleViewTimetable = (timetable) => {
        setViewingTimetable(timetable);
        setIsEditingMode(false);
        setIsTimetableModalOpen(true);
    };

    const handleEditTimetableGrid = (timetable) => {
        if (timetable.frozen) {
            alert('This timetable is frozen and cannot be edited.');
            return;
        }
        setViewingTimetable(timetable);
        setIsEditingMode(true);
        setIsTimetableModalOpen(true);
    };

    const handleSaveTimetableChanges = () => {
        if (viewingTimetable) {
            setTimetables(timetables.map(t =>
                t.id === viewingTimetable.id
                    ? viewingTimetable
                    : t
            ));
            setIsEditingMode(false);
            alert('Timetable changes saved successfully!');
        }
    };

    // Drag and drop functions
    const handleDragStart = (day, timeSlot, course) => {
        if (!course || !isEditingMode) return; // Can't drag empty slots or when not in edit mode
        setDraggingSlot({ day, timeSlot, course });
    };

    const handleDragOver = (e) => {
        e.preventDefault(); // Allow drop
    };

    const handleDrop = (targetDay, targetTimeSlot) => {
        if (!draggingSlot || !isEditingMode) return;

        const { day: sourceDay, timeSlot: sourceTimeSlot, course } = draggingSlot;

        // Update the timetable schedule
        const updatedTimetable = { ...viewingTimetable };
        const newSchedule = { ...updatedTimetable.schedule };

        // Remove from source slot
        if (sourceDay === targetDay && sourceTimeSlot === targetTimeSlot) {
            // Same slot, do nothing
            return;
        }

        // Remove from source slot
        newSchedule[sourceDay][sourceTimeSlot] = null;

        // Add to target slot
        newSchedule[targetDay] = { ...newSchedule[targetDay] };
        newSchedule[targetDay][targetTimeSlot] = course;

        updatedTimetable.schedule = newSchedule;
        setViewingTimetable(updatedTimetable);
        setDraggingSlot(null);
    };

    // Departments View
    const renderDepartmentsView = () => (
        <div>
            <h2 className="text-xl font-semibold mb-6">Departments</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {departments.map((department) => (
                    <div
                        key={department.id}
                        className="bg-white rounded-lg shadow p-6 cursor-pointer hover:shadow-lg transition-shadow border-2 border-transparent hover:border-green-500"
                        onClick={() => handleDepartmentSelect(department)}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-lg text-gray-800">{department.name}</h3>
                            <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2 py-1 rounded">
                                {department.code}
                            </span>
                        </div>
                        <div className="text-sm text-gray-600 space-y-2">
                            <p className="flex items-center">
                                <i className="fas fa-chalkboard-teacher mr-2 text-green-500"></i>
                                {department.facultyCount} Faculty Members
                            </p>
                            <p className="flex items-center">
                                <i className="fas fa-user-graduate mr-2 text-blue-500"></i>
                                {department.studentCount} Students
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    // Semester Selection View
    const renderSemesterView = () => (
        <div>
            <div className="flex items-center mb-6">
                <button
                    onClick={handleBackToDepartments}
                    className="flex items-center text-gray-600 hover:text-gray-800 mr-4"
                >
                    <i className="fas fa-arrow-left mr-2"></i>
                    Back to Departments
                </button>
                <h2 className="text-xl font-semibold">
                    {selectedDepartment?.name} - Select Semester
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {semesters.map((semester) => (
                    <div
                        key={semester.id}
                        className="bg-white rounded-lg shadow p-6 cursor-pointer hover:shadow-lg transition-shadow border-2 border-transparent hover:border-green-500"
                        onClick={() => handleSemesterSelect(semester)}
                    >
                        <div className="text-center">
                            <h3 className="font-bold text-lg text-gray-800 mb-2">{semester.name}</h3>
                            <p className="text-sm text-gray-600 mb-4">Code: {semester.code}</p>
                            <div className="text-xs text-gray-500 space-y-1">
                                <p>Start: {semester.startDate}</p>
                                <p>End: {semester.endDate}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    // Timetable Grid View for Modal
    const renderTimetableGrid = (timetable) => (
        <div className="bg-white rounded-lg">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">{timetable.name} - Schedule</h3>
                {isEditingMode && (
                    <div className="text-sm text-orange-600 bg-orange-50 px-3 py-1 rounded">
                        <i className="fas fa-edit mr-1"></i> Drag and drop to edit
                    </div>
                )}
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-300">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 bg-gray-100 p-3 font-semibold">Time</th>
                            {days.map(day => (
                                <th key={day} className="border border-gray-300 bg-gray-100 p-3 font-semibold text-center">
                                    {day}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {timeSlots.map(timeSlot => (
                            <tr key={timeSlot}>
                                <td className="border border-gray-300 bg-gray-50 p-3 font-medium text-sm">
                                    {timeSlot}
                                </td>
                                {days.map(day => {
                                    const course = timetable.schedule[day]?.[timeSlot];
                                    return (
                                        <td
                                            key={`${day}-${timeSlot}`}
                                            className={`border border-gray-300 p-2 min-w-[200px] ${course ? 'bg-blue-50 hover:bg-blue-100' : 'hover:bg-gray-50'
                                                } ${isEditingMode ? 'cursor-move' : ''}`}
                                            onDragOver={isEditingMode ? handleDragOver : undefined}
                                            onDrop={isEditingMode ? (e) => handleDrop(day, timeSlot) : undefined}
                                        >
                                            {course ? (
                                                <div
                                                    draggable={isEditingMode}
                                                    onDragStart={() => handleDragStart(day, timeSlot, course)}
                                                    className={`p-2 rounded border-l-4 ${timetable.frozen
                                                            ? 'border-green-500 bg-green-50 cursor-default'
                                                            : isEditingMode
                                                                ? 'border-blue-500 bg-blue-100 cursor-grab'
                                                                : 'border-blue-500 bg-blue-100'
                                                        }`}
                                                >
                                                    <div className="font-semibold text-sm">{course.code}</div>
                                                    <div className="text-xs text-gray-600">{course.name}</div>
                                                    <div className="text-xs text-gray-500">{course.instructor}</div>
                                                    <div className="text-xs text-gray-400">{course.room}</div>
                                                </div>
                                            ) : (
                                                <div className="text-gray-400 text-xs text-center py-4">
                                                    {isEditingMode ? 'Drop here' : 'Empty'}
                                                </div>
                                            )}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    // Timetable Management View
    const renderTimetableView = () => {
        // Filter timetables for current department and semester
        const filteredTimetables = timetables.filter(t =>
            t.department === selectedDepartment?.name &&
            t.semester === selectedSemester?.name
        );

        return (
            <div>
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                        <button
                            onClick={handleBackToSemester}
                            className="flex items-center text-gray-600 hover:text-gray-800 mr-4"
                        >
                            <i className="fas fa-arrow-left mr-2"></i>
                            Back to Semesters
                        </button>
                        <div>
                            <h2 className="text-xl font-semibold">{selectedDepartment?.name} Timetable</h2>
                            <p className="text-sm text-gray-600">
                                {selectedSemester?.name}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        {/* View Toggle */}
                        <div className="flex bg-gray-100 rounded-lg p-1">
                            <button
                                onClick={() => setViewMode('list')}
                                className={`px-3 py-1 rounded-md text-sm font-medium ${viewMode === 'list'
                                        ? 'bg-white text-gray-800 shadow-sm'
                                        : 'text-gray-600 hover:text-gray-800'
                                    }`}
                            >
                                <i className="fas fa-list mr-1"></i> List
                            </button>
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`px-3 py-1 rounded-md text-sm font-medium ${viewMode === 'grid'
                                        ? 'bg-white text-gray-800 shadow-sm'
                                        : 'text-gray-600 hover:text-gray-800'
                                    }`}
                            >
                                <i className="fas fa-table mr-1"></i> Grid
                            </button>
                        </div>

                        <button
                            onClick={() => setIsCreateModalOpen(true)}
                            className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-green-700"
                        >
                            <i className="fas fa-plus mr-2"></i> Create Timetable
                        </button>
                    </div>
                </div>

                {/* Shared Timetable Alert */}
                {filteredTimetables.some(t => t.shared) && (
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
                        <div className="flex items-center">
                            <i className="fas fa-share-alt text-purple-500 mr-3"></i>
                            <div>
                                <h4 className="text-sm font-medium text-purple-800">Shared Timetable</h4>
                                <p className="text-sm text-purple-700 mt-1">
                                    Only one timetable can be shared at a time. The shared timetable is visible to students and faculty.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Frozen Timetable Alert */}
                {filteredTimetables.some(t => t.frozen) && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                        <div className="flex items-center">
                            <i className="fas fa-info-circle text-blue-500 mr-3"></i>
                            <div>
                                <h4 className="text-sm font-medium text-blue-800">Permanently Frozen Timetables</h4>
                                <p className="text-sm text-blue-700 mt-1">
                                    Frozen timetables are permanent records and cannot be edited or deleted. Only frozen timetables can be shared.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {viewMode === 'list' ? (
                    // List View
                    <div className="bg-white rounded-lg shadow overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Generated Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Frozen</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shared</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredTimetables.map((timetable) => (
                                    <tr key={timetable.id} className={`hover:bg-gray-50 ${timetable.frozen ? 'bg-blue-50' : ''}`}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            <div className="flex items-center">
                                                {timetable.name}
                                                {timetable.frozen && (
                                                    <i className="fas fa-lock ml-2 text-blue-500" title="Permanently Frozen"></i>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${timetable.status === 'Active' ? 'bg-green-100 text-green-800' :
                                                    timetable.status === 'Draft' ? 'bg-yellow-100 text-yellow-800' :
                                                        'bg-gray-100 text-gray-800'
                                                }`}>
                                                {timetable.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {timetable.generatedDate}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {timetable.frozen ? (
                                                <span className="text-blue-600 font-medium flex items-center">
                                                    <i className="fas fa-lock mr-1"></i> Permanent
                                                </span>
                                            ) : (
                                                <span className="text-green-600 font-medium">No</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {timetable.shared ? (
                                                <span className="text-purple-600 font-medium flex items-center">
                                                    <i className="fas fa-share-alt mr-1"></i> Shared
                                                </span>
                                            ) : timetable.frozen ? (
                                                <span className="text-green-600 font-medium flex items-center">
                                                    <i className="fas fa-share mr-1"></i> Ready to Share
                                                </span>
                                            ) : (
                                                <span className="text-gray-500">Not Available</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {timetable.description}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                            <button
                                                onClick={() => handleViewTimetable(timetable)}
                                                className="text-blue-600 hover:text-blue-900"
                                                title="View timetable grid"
                                            >
                                                View
                                            </button>

                                            <button
                                                onClick={() => handleEditTimetable(timetable)}
                                                className={`${timetable.frozen ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:text-blue-900'}`}
                                                disabled={timetable.frozen}
                                                title={timetable.frozen ? 'Permanently frozen - cannot edit' : 'Edit timetable details'}
                                            >
                                                Edit
                                            </button>

                                            {timetable.shared ? (
                                                <button
                                                    onClick={() => handleUnshareTimetable(timetable.id)}
                                                    className="text-purple-600 hover:text-purple-900"
                                                    title="Stop sharing this timetable"
                                                >
                                                    Unshare
                                                </button>
                                            ) : timetable.frozen ? (
                                                <button
                                                    onClick={() => handleShareTimetable(timetable)}
                                                    className="text-purple-600 hover:text-purple-900"
                                                    title="Share this timetable"
                                                >
                                                    Share
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => handleShareTimetable(timetable)}
                                                    className="text-gray-400 cursor-not-allowed"
                                                    disabled
                                                    title="Freeze timetable first to enable sharing"
                                                >
                                                    Share
                                                </button>
                                            )}

                                            {!timetable.frozen && (
                                                <button
                                                    onClick={() => handleFreezeTimetable(timetable.id)}
                                                    className="text-orange-600 hover:text-orange-900"
                                                    title="Freeze timetable permanently to enable sharing"
                                                >
                                                    Freeze
                                                </button>
                                            )}
                                            {timetable.frozen && (
                                                <span className="text-gray-400 cursor-not-allowed" title="Permanently frozen">
                                                    Freeze
                                                </span>
                                            )}
                                            <button
                                                onClick={() => handleDeleteTimetable(timetable.id)}
                                                className={`${timetable.frozen ? 'text-gray-400 cursor-not-allowed' : 'text-red-600 hover:text-red-900'}`}
                                                disabled={timetable.frozen}
                                                title={timetable.frozen ? 'Permanently frozen - cannot delete' : 'Delete timetable'}
                                            >
                                                Delete
                                            </button>

                                            {!timetable.frozen && (
                                                <button
                                                    onClick={() => handleEditTimetableGrid(timetable)}
                                                    className="text-green-600 hover:text-green-900"
                                                    title="Edit timetable grid with drag and drop"
                                                >
                                                    Edit Grid
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    // Grid View - Show timetable cards
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredTimetables.map(timetable => (
                            <div key={timetable.id} className="bg-white rounded-lg shadow p-6 border-2 border-transparent hover:border-green-500 transition-colors">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-bold text-lg text-gray-800">{timetable.name}</h3>
                                    {timetable.frozen && (
                                        <i className="fas fa-lock text-blue-500" title="Permanently Frozen"></i>
                                    )}
                                </div>
                                <div className="space-y-2 mb-4">
                                    <p className="text-sm text-gray-600">
                                        <span className={`inline-block w-2 h-2 rounded-full mr-2 ${timetable.status === 'Active' ? 'bg-green-500' :
                                                timetable.status === 'Draft' ? 'bg-yellow-500' : 'bg-gray-500'
                                            }`}></span>
                                        {timetable.status}
                                    </p>
                                    <p className="text-sm text-gray-600">Generated: {timetable.generatedDate}</p>
                                    <p className="text-sm text-gray-500">{timetable.description}</p>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    <button
                                        onClick={() => handleViewTimetable(timetable)}
                                        className="flex-1 bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700"
                                    >
                                        View
                                    </button>
                                    {!timetable.frozen && (
                                        <button
                                            onClick={() => handleEditTimetableGrid(timetable)}
                                            className="flex-1 bg-green-600 text-white px-3 py-2 rounded text-sm hover:bg-green-700"
                                        >
                                            Edit Grid
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    };

    // Create Timetable Modal
    const renderCreateModal = () => (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h3 className="text-lg font-semibold mb-4">Create New Timetable</h3>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Timetable Name</label>
                        <input
                            type="text"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2"
                            value={newTimetable.name}
                            onChange={(e) => setNewTimetable({ ...newTimetable, name: e.target.value })}
                            placeholder="Enter timetable name"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                        <textarea
                            className="w-full border border-gray-300 rounded-lg px-3 py-2"
                            rows="3"
                            value={newTimetable.description}
                            onChange={(e) => setNewTimetable({ ...newTimetable, description: e.target.value })}
                            placeholder="Enter timetable description"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                        <select
                            className="w-full border border-gray-300 rounded-lg px-3 py-2"
                            value={newTimetable.status}
                            onChange={(e) => setNewTimetable({ ...newTimetable, status: e.target.value })}
                        >
                            <option value="Draft">Draft</option>
                            <option value="Active">Active</option>
                            <option value="Archived">Archived</option>
                        </select>
                    </div>
                </div>
                <div className="flex justify-end space-x-3 mt-6">
                    <button
                        onClick={() => setIsCreateModalOpen(false)}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleCreateTimetable}
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                        Create
                    </button>
                </div>
            </div>
        </div>
    );

    // Edit Timetable Modal
    const renderEditModal = () => (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h3 className="text-lg font-semibold mb-4">
                    Edit Timetable
                    {editingTimetable?.frozen && (
                        <span className="ml-2 text-sm text-blue-600 font-normal">(Permanently Frozen - Cannot be edited)</span>
                    )}
                </h3>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Timetable Name</label>
                        <input
                            type="text"
                            className={`w-full border rounded-lg px-3 py-2 ${editingTimetable?.frozen
                                    ? 'bg-gray-100 border-gray-300 text-gray-500 cursor-not-allowed'
                                    : 'border-gray-300'
                                }`}
                            value={editingTimetable?.name || ''}
                            onChange={(e) => !editingTimetable?.frozen && setEditingTimetable({ ...editingTimetable, name: e.target.value })}
                            disabled={editingTimetable?.frozen}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                        <textarea
                            className={`w-full border rounded-lg px-3 py-2 ${editingTimetable?.frozen
                                    ? 'bg-gray-100 border-gray-300 text-gray-500 cursor-not-allowed'
                                    : 'border-gray-300'
                                }`}
                            rows="3"
                            value={editingTimetable?.description || ''}
                            onChange={(e) => !editingTimetable?.frozen && setEditingTimetable({ ...editingTimetable, description: e.target.value })}
                            disabled={editingTimetable?.frozen}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                        <select
                            className={`w-full border rounded-lg px-3 py-2 ${editingTimetable?.frozen
                                    ? 'bg-gray-100 border-gray-300 text-gray-500 cursor-not-allowed'
                                    : 'border-gray-300'
                                }`}
                            value={editingTimetable?.status || ''}
                            onChange={(e) => !editingTimetable?.frozen && setEditingTimetable({ ...editingTimetable, status: e.target.value })}
                            disabled={editingTimetable?.frozen}
                        >
                            <option value="Draft">Draft</option>
                            <option value="Active">Active</option>
                            <option value="Archived">Archived</option>
                        </select>
                    </div>
                </div>
                <div className="flex justify-end space-x-3 mt-6">
                    <button
                        onClick={() => setIsEditModalOpen(false)}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                    >
                        {editingTimetable?.frozen ? 'Close' : 'Cancel'}
                    </button>
                    {!editingTimetable?.frozen && (
                        <button
                            onClick={handleSaveEdit}
                            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                        >
                            Save Changes
                        </button>
                    )}
                </div>
            </div>
        </div>
    );

    // Share Timetable Modal
    const renderShareModal = () => (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h3 className="text-lg font-semibold mb-4">
                    Share Timetable
                </h3>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                    <div className="flex items-center">
                        <i className="fas fa-check-circle text-green-500 mr-2"></i>
                        <span className="text-sm text-green-800 font-medium">This timetable is frozen and ready for sharing</span>
                    </div>
                </div>

                <p className="text-sm text-gray-600 mb-4">
                    Share "{sharingTimetable?.name}" with the following groups:
                </p>

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={shareSettings.students}
                                onChange={(e) => setShareSettings({ ...shareSettings, students: e.target.checked })}
                                className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                            />
                            <span className="ml-2 text-sm text-gray-700">Students</span>
                        </label>
                        <span className="text-xs text-gray-500">All enrolled students</span>
                    </div>

                    <div className="flex items-center justify-between">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={shareSettings.faculty}
                                onChange={(e) => setShareSettings({ ...shareSettings, faculty: e.target.checked })}
                                className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                            />
                            <span className="ml-2 text-sm text-gray-700">Faculty</span>
                        </label>
                        <span className="text-xs text-gray-500">All teaching faculty</span>
                    </div>

                    <div className="flex items-center justify-between">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={shareSettings.public}
                                onChange={(e) => setShareSettings({ ...shareSettings, public: e.target.checked })}
                                className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                            />
                            <span className="ml-2 text-sm text-gray-700">Public</span>
                        </label>
                        <span className="text-xs text-gray-500">Anyone with link</span>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Expiration Date (Optional)
                        </label>
                        <input
                            type="date"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2"
                            value={shareSettings.expirationDate}
                            onChange={(e) => setShareSettings({ ...shareSettings, expirationDate: e.target.value })}
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            Leave empty for permanent sharing
                        </p>
                    </div>
                </div>

                <div className="mt-6 p-4 bg-purple-50 rounded-lg">
                    <h4 className="text-sm font-medium text-purple-800 mb-2">Sharing Summary</h4>
                    <p className="text-sm text-purple-700">
                        This timetable will be available to:
                        {shareSettings.students && " Students"}
                        {shareSettings.faculty && " Faculty"}
                        {shareSettings.public && " Public"}
                        {!shareSettings.students && !shareSettings.faculty && !shareSettings.public && " No one"}
                    </p>
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                    <button
                        onClick={() => {
                            setIsShareModalOpen(false);
                            setSharingTimetable(null);
                            setShareSettings({
                                students: true,
                                faculty: true,
                                public: false,
                                expirationDate: ''
                            });
                        }}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSaveShare}
                        className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                    >
                        Share Timetable
                    </button>
                </div>
            </div>
        </div>
    );

    // Timetable Grid Modal
    const renderTimetableModal = () => (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] overflow-auto">
                <div className="p-6 border-b border-gray-200">
                    <div className="flex justify-between items-center">
                        <h3 className="text-xl font-semibold">
                            {viewingTimetable?.name}
                            {isEditingMode && (
                                <span className="ml-2 text-sm text-orange-600 font-normal">(Editing Mode)</span>
                            )}
                        </h3>
                        <div className="flex items-center space-x-3">
                            {isEditingMode && (
                                <button
                                    onClick={handleSaveTimetableChanges}
                                    className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-green-700"
                                >
                                    <i className="fas fa-save mr-2"></i> Save Changes
                                </button>
                            )}
                            <button
                                onClick={() => {
                                    setIsTimetableModalOpen(false);
                                    setViewingTimetable(null);
                                    setIsEditingMode(false);
                                }}
                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
                <div className="p-6">
                    {viewingTimetable && renderTimetableGrid(viewingTimetable)}
                </div>
            </div>
        </div>
    );

    return (
        <div>
            {currentStep === 'departments' && renderDepartmentsView()}
            {currentStep === 'semester' && renderSemesterView()}
            {currentStep === 'timetable' && renderTimetableView()}

            {isCreateModalOpen && renderCreateModal()}
            {isEditModalOpen && renderEditModal()}
            {isShareModalOpen && renderShareModal()}
            {isTimetableModalOpen && renderTimetableModal()}
        </div>
    );
};

export default TimetableView;
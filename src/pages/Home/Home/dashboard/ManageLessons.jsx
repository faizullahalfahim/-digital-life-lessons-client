import React, { useState } from 'react';
import {
    Trash2,
    Eye,
    EyeOff,
    CheckCircle,
    Flag,
    Settings,
    Star,
    Filter,
    Search,
    BookOpen,
    Users,
} from 'lucide-react';
import Swal from 'sweetalert2';

// ডামি ডেটা (প্রকৃত অ্যাপ্লিকেশনে এটি API থেকে আসবে)
const initialLessons = [
    {
        id: 1,
        title: 'Introduction to React Hooks',
        creator: 'Alice Smith',
        category: 'Development',
        visibility: 'Public',
        status: 'Pending', // Pending, Reviewed
        flags: 2,
        isFeatured: false,
        isDeleted: false,
        public: true,
    },
    {
        id: 2,
        title: 'Mastering Tailwind CSS',
        creator: 'Bob Johnson',
        category: 'Design',
        visibility: 'Private',
        status: 'Reviewed',
        flags: 0,
        isFeatured: true,
        isDeleted: false,
        public: false,
    },
    {
        id: 3,
        title: 'Advanced JavaScript Concepts (Inappropriate)',
        creator: 'Charlie Brown',
        category: 'Programming',
        visibility: 'Public',
        status: 'Pending',
        flags: 5, // ফ্লাগ করা হয়েছে
        isFeatured: false,
        isDeleted: false,
        public: true,
    },
    {
        id: 4,
        title: 'Data Science with Python',
        creator: 'David Lee',
        category: 'Data Science',
        visibility: 'Public',
        status: 'Reviewed',
        flags: 0,
        isFeatured: false,
        isDeleted: false,
        public: true,
    },
];

const ManageLessons = () => {
    const [lessons, setLessons] = useState(initialLessons);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState({ category: 'All', visibility: 'All', flags: 'All' });

    // ডামি স্ট্যাটস
    const publicLessonsCount = lessons.filter(l => l.public && !l.isDeleted).length;
    const totalLessons = lessons.filter(l => !l.isDeleted).length;

    // --- Admin Controls Handlers ---

    // 1. Delete inappropriate lessons
    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this lesson!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it permanently!'
        }).then((result) => {
            if (result.isConfirmed) {
                // প্রকৃত অ্যাপ্লিকেশনে এখানে API কল হবে
                setLessons(lessons.map(l => l.id === id ? { ...l, isDeleted: true } : l));
                Swal.fire('Deleted!', 'The lesson has been permanently removed.', 'success');
            }
        });
    };

    // 2. Make lessons featured / unfeatured
    const toggleFeatured = (id) => {
        setLessons(lessons.map(l => 
            l.id === id ? { ...l, isFeatured: !l.isFeatured } : l
        ));
    };

    // 3. Mark content as reviewed
    const markAsReviewed = (id) => {
        setLessons(lessons.map(l => 
            l.id === id ? { ...l, status: 'Reviewed' } : l
        ));
        Swal.fire('Reviewed!', 'Content has been marked as reviewed.', 'success');
    };

    // --- Filtering Logic ---
    const filteredLessons = lessons
        .filter(l => !l.isDeleted) // ডিলিট করাগুলো বাদ
        .filter(l => l.title.toLowerCase().includes(searchTerm.toLowerCase()))
        .filter(l => filter.category === 'All' || l.category === filter.category)
        .filter(l => filter.visibility === 'All' || l.visibility === filter.visibility)
        .filter(l => filter.flags === 'All' || (filter.flags === 'Flagged' && l.flags > 0) || (filter.flags === 'Unflagged' && l.flags === 0));


    const categories = ['All', ...new Set(initialLessons.map(l => l.category))];
    const visibilityOptions = ['All', 'Public', 'Private'];
    const flagOptions = ['All', 'Flagged', 'Unflagged'];


    return (
        <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Settings className="w-7 h-7" /> Manage All Lessons
            </h1>
            <p className="text-gray-600 mb-8">
                Control and moderate all user-generated lessons across the platform.
            </p>

            {/* --- Stats Section --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="card bg-white shadow-lg p-5 border-l-4 border-blue-500">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Total Lessons</p>
                            <h2 className="text-3xl font-bold text-gray-900">{totalLessons}</h2>
                        </div>
                        <BookOpen className="w-8 h-8 text-blue-500 opacity-50" />
                    </div>
                </div>
                
                <div className="card bg-white shadow-lg p-5 border-l-4 border-green-500">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Public Lessons</p>
                            <h2 className="text-3xl font-bold text-gray-900">{publicLessonsCount}</h2>
                        </div>
                        <Users className="w-8 h-8 text-green-500 opacity-50" />
                    </div>
                </div>
                
                <div className="card bg-white shadow-lg p-5 border-l-4 border-red-500">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Lessons Flagged</p>
                            <h2 className="text-3xl font-bold text-gray-900">{lessons.filter(l => l.flags > 0).length}</h2>
                        </div>
                        <Flag className="w-8 h-8 text-red-500 opacity-50" />
                    </div>
                </div>
                
                <div className="card bg-white shadow-lg p-5 border-l-4 border-yellow-500">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm font-medium text-gray-500">Pending Review</p>
                            <h2 className="text-3xl font-bold text-gray-900">{lessons.filter(l => l.status === 'Pending').length}</h2>
                        </div>
                        <CheckCircle className="w-8 h-8 text-yellow-500 opacity-50" />
                    </div>
                </div>
            </div>

            {/* --- Search and Filter Bar --- */}
            <div className="bg-white p-5 rounded-lg shadow-lg mb-6 flex flex-col lg:flex-row gap-4 items-center border border-gray-100">
                
                {/* Search */}
                <div className="relative w-full lg:w-1/3">
                    <input
                        type="text"
                        placeholder="Search by lesson title..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="input input-bordered w-full pl-10"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>

                {/* Filters */}
                <div className="flex gap-4 w-full lg:w-2/3">
                    <div className="w-full">
                        <label className="text-xs font-semibold block text-gray-600 mb-1">Category</label>
                        <select
                            className="select select-bordered w-full"
                            value={filter.category}
                            onChange={(e) => setFilter({ ...filter, category: e.target.value })}
                        >
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    <div className="w-full">
                        <label className="text-xs font-semibold block text-gray-600 mb-1">Visibility</label>
                        <select
                            className="select select-bordered w-full"
                            value={filter.visibility}
                            onChange={(e) => setFilter({ ...filter, visibility: e.target.value })}
                        >
                            {visibilityOptions.map(vis => (
                                <option key={vis} value={vis}>{vis}</option>
                            ))}
                        </select>
                    </div>

                    <div className="w-full">
                        <label className="text-xs font-semibold block text-gray-600 mb-1">Flags</label>
                        <select
                            className="select select-bordered w-full"
                            value={filter.flags}
                            onChange={(e) => setFilter({ ...filter, flags: e.target.value })}
                        >
                            {flagOptions.map(flag => (
                                <option key={flag} value={flag}>{flag}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* --- Lessons Table --- */}
            <div className="overflow-x-auto bg-white rounded-lg shadow-lg border border-gray-100">
                <table className="table w-full">
                    <thead>
                        <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                            <th className="py-3 px-6 text-left">Lesson Title</th>
                            <th className="py-3 px-6 text-left">Creator</th>
                            <th className="py-3 px-6 text-center">Category</th>
                            <th className="py-3 px-6 text-center">Status</th>
                            <th className="py-3 px-6 text-center">Flags</th>
                            <th className="py-3 px-6 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                        {filteredLessons.length > 0 ? (
                            filteredLessons.map(lesson => (
                                <tr key={lesson.id} className={`border-b border-gray-200 hover:bg-gray-50 ${lesson.flags > 0 ? 'bg-red-50/50' : ''}`}>
                                    
                                    {/* Lesson Title */}
                                    <td className="py-3 px-6 text-left whitespace-nowrap">
                                        <div className="font-semibold text-gray-900">{lesson.title}</div>
                                        <div className={`text-xs mt-1 font-medium ${lesson.visibility === 'Public' ? 'text-green-500' : 'text-yellow-500'}`}>
                                            {lesson.visibility}
                                        </div>
                                    </td>
                                    
                                    {/* Creator */}
                                    <td className="py-3 px-6 text-left">{lesson.creator}</td>
                                    
                                    {/* Category */}
                                    <td className="py-3 px-6 text-center">
                                        <span className="badge badge-ghost badge-sm">{lesson.category}</span>
                                    </td>
                                    
                                    {/* Status (Reviewed/Pending) */}
                                    <td className="py-3 px-6 text-center">
                                        <span className={`badge ${lesson.status === 'Reviewed' ? 'badge-success' : 'badge-warning'} text-white`}>
                                            {lesson.status}
                                        </span>
                                    </td>
                                    
                                    {/* Flags */}
                                    <td className="py-3 px-6 text-center">
                                        <div className={`flex items-center justify-center gap-1 font-bold ${lesson.flags > 0 ? 'text-red-500' : 'text-gray-500'}`}>
                                            {lesson.flags} <Flag className="w-4 h-4" />
                                        </div>
                                    </td>

                                    {/* Admin Actions */}
                                    <td className="py-3 px-6 text-center">
                                        <div className="flex item-center justify-center gap-2">
                                            
                                            {/* Make Featured */}
                                            <button
                                                onClick={() => toggleFeatured(lesson.id)}
                                                title={lesson.isFeatured ? "Unfeature Lesson" : "Make Featured"}
                                                className={`btn btn-ghost btn-xs tooltip ${lesson.isFeatured ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-500'}`}
                                            >
                                                <Star className="w-4 h-4" />
                                            </button>

                                            {/* Mark as Reviewed */}
                                            {lesson.status !== 'Reviewed' && (
                                                <button
                                                    onClick={() => markAsReviewed(lesson.id)}
                                                    title="Mark as Reviewed"
                                                    className="btn btn-ghost btn-xs tooltip text-green-500 hover:bg-green-100"
                                                >
                                                    <CheckCircle className="w-4 h-4" />
                                                </button>
                                            )}
                                            
                                            {/* Delete Lesson */}
                                            <button
                                                onClick={() => handleDelete(lesson.id)}
                                                title="Delete Permanently"
                                                className="btn btn-ghost btn-xs tooltip text-red-500 hover:bg-red-100"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="py-10 text-center text-gray-500">
                                    No lessons match the current filters.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageLessons;
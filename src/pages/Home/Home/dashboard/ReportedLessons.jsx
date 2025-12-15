import React from 'react';
import {
    Trash2,
    Eye,
    XCircle,
    Flag,
    AlertTriangle,
    MessageSquare,
    Users,
} from 'lucide-react';

// স্ট্যাটিক ডেটা (Reporting reasons and reporter info)
const STATIC_REPORTS = [
    { id: 'r1', reason: 'Harmful/Illegal Content', reporterEmail: 'user1@example.com', date: '2025-12-01' },
    { id: 'r2', reason: 'Misinformation', reporterEmail: 'user2@example.com', date: '2025-12-01' },
    { id: 'r3', reason: 'Spam/Scam', reporterEmail: 'user3@example.com', date: '2025-12-02' },
    { id: 'r4', reason: 'Hate Speech', reporterEmail: 'user4@example.com', date: '2025-12-03' },
];

// স্ট্যাটিক লেসন ডেটা
const STATIC_LESSONS = [
    {
        id: 101,
        title: 'Advanced Hacking Techniques (Flagged)',
        creator: 'Eve Green',
        reportCount: 5,
        reports: STATIC_REPORTS,
        status: 'Pending',
    },
    {
        id: 102,
        title: 'Basic Cooking Class (Wrong Category)',
        creator: 'Fiona White',
        reportCount: 1,
        reports: [STATIC_REPORTS[0]], // ডামি রিপোর্ট
        status: 'Pending',
    },
    {
        id: 103,
        title: 'Old Content Strategy (Ignored)',
        creator: 'George Blue',
        reportCount: 2,
        reports: [STATIC_REPORTS[1], STATIC_REPORTS[2]], // ডামি রিপোর্ট
        status: 'Ignored', // Ignored হিসেবে দেখানো হলো
    },
];

// স্ট্যাটিক মডাল কন্টেন্ট (যেটি মডাল খুললে দেখানো হবে)
const StaticModalContent = ({ lesson }) => (
    <div className="p-4">
        <h3 className="text-xl font-bold mb-4 border-b pb-2 text-gray-800">
            Reports for: {lesson.title}
        </h3>
        
        <div className="max-h-96 overflow-y-auto pr-2">
            {lesson.reports.map((report, index) => (
                <div key={index} className="bg-gray-50 p-3 mb-3 rounded-lg border border-gray-200">
                    <div className="font-semibold text-red-600 flex items-center gap-2">
                        <AlertTriangle className='w-4 h-4' /> {report.reason}
                    </div>
                    <p className="text-sm text-gray-700 mt-1 ml-6">
                        Reporter: <span className="font-medium text-blue-600">{report.reporterEmail}</span>
                    </p>
                    <p className="text-xs text-gray-500 mt-1 ml-6">
                        Date: {new Date(report.date).toLocaleDateString()}
                    </p>
                </div>
            ))}
        </div>

        <div className="mt-6 flex justify-end gap-3 pt-4 border-t">
            {/* ডিলিট এবং ইগনোর বাটনগুলো স্ট্যাটিক্যালি আছে, onClick হ্যান্ডলার নেই */}
            <button
                className="btn btn-error text-white flex items-center gap-2"
            >
                <Trash2 className="w-5 h-5" /> Delete Lesson
            </button>
            <button
                className="btn btn-ghost border-gray-300 flex items-center gap-2"
            >
                <XCircle className="w-5 h-5" /> Ignore Reports
            </button>
        </div>
    </div>
);


const ReportedLessons = () => {
    // এখানে কোনো স্টেট ব্যবহার করা হচ্ছে না, সব ডেটা স্ট্যাটিক
    const pendingLessonsCount = STATIC_LESSONS.filter(l => l.status === 'Pending').length;
    
    // মডাল ডেটা (স্ট্যাটিক্যালি, প্রথম লেসন এর রিপোর্ট দেখানোর জন্য)
    const staticModalLesson = STATIC_LESSONS[0]; 

    return (
        <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold text-red-700 mb-6 flex items-center gap-3">
                <Flag className="w-7 h-7" /> Reported Lessons
            </h1>
            <p className="text-gray-600 mb-8">
                Monitor and take necessary actions on lessons flagged by the community to ensure safety and quality.
            </p>

            {/* --- Stats Header --- */}
            <div className="card bg-red-100 shadow-md p-5 mb-8 border-l-4 border-red-500 flex justify-between items-center">
                <div>
                    <p className="text-sm font-medium text-red-500">Total Pending Reports</p>
                    <h2 className="text-3xl font-bold text-red-800">{pendingLessonsCount}</h2>
                </div>
                <AlertTriangle className="w-10 h-10 text-red-500 opacity-60" />
            </div>

            {/* --- Lessons Table --- */}
            <div className="overflow-x-auto bg-white rounded-lg shadow-lg border border-gray-100">
                <table className="table w-full">
                    <thead>
                        <tr className="bg-red-50 text-gray-700 uppercase text-sm leading-normal">
                            <th className="py-3 px-6 text-left">Lesson Title</th>
                            <th className="py-3 px-6 text-left">Creator</th>
                            <th className="py-3 px-6 text-center">Report Count</th>
                            <th className="py-3 px-6 text-center">Status</th>
                            <th className="py-3 px-6 text-center">Details & Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                        {STATIC_LESSONS.map(lesson => (
                            <tr key={lesson.id} className={`border-b border-gray-200 hover:bg-red-50/50 ${lesson.status === 'Ignored' ? 'opacity-50' : ''}`}>
                                
                                {/* Lesson Title */}
                                <td className="py-3 px-6 text-left whitespace-nowrap">
                                    <div className="font-semibold text-gray-900">{lesson.title}</div>
                                </td>
                                
                                {/* Creator */}
                                <td className="py-3 px-6 text-left">{lesson.creator}</td>
                                
                                {/* Report Count */}
                                <td className="py-3 px-6 text-center">
                                    <span className={`badge badge-lg text-white ${lesson.reportCount > 3 ? 'badge-error' : 'badge-warning'}`}>
                                        {lesson.reportCount}
                                    </span>
                                </td>
                                
                                {/* Status */}
                                <td className="py-3 px-6 text-center">
                                    <span className={`font-semibold ${lesson.status === 'Pending' ? 'text-red-600' : 'text-green-600'}`}>
                                        {lesson.status}
                                    </span>
                                </td>

                                {/* Actions */}
                                <td className="py-3 px-6 text-center">
                                    <div className="flex item-center justify-center gap-2">
                                        
                                        {/* Button to open modal for details */}
                                        {/* Note: In static code, this will only open the modal if you use DaisyUI's declarative modal setup. */}
                                        <label
                                            htmlFor="report_modal_static" // DaisyUI Modal ID
                                            title="View Report Details & Take Action"
                                            className="btn btn-info btn-xs text-white tooltip flex items-center gap-1"
                                        >
                                            <Eye className="w-4 h-4" /> View Details
                                        </label>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* --- DaisyUI Modal (Static) --- */}
            {/* Note: This static modal implementation uses DaisyUI's built-in hidden checkbox trick. 
               You will need to implement the dynamic state-based Modal later. */}
            <input type="checkbox" id="report_modal_static" className="modal-toggle" />
            <div className="modal" role="dialog">
                <div className="modal-box w-11/12 max-w-3xl">
                    <form method="dialog">
                        <label htmlFor="report_modal_static" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</label>
                    </form>
                    <StaticModalContent lesson={staticModalLesson} />
                </div>
                <label className="modal-backdrop" htmlFor="report_modal_static">Close</label>
            </div>
        </div>
    );
};

export default ReportedLessons;
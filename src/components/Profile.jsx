import React, { useState } from 'react';
import useAuth from '../hooks/UseAuth';
import {
    Camera,
    Edit3,
    Lock,
    Trash2,
    Mail,
    User,
    Phone,
    CheckCircle,
    XCircle
} from 'lucide-react';

const Profile = () => {

    const { user } = useAuth();

    const userData = {
        displayName: user?.displayName || "User Name",
        email: user?.email || "user@example.com",
        photoURL:
            user?.photoURL ||
            "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
        role: "Student / Instructor",
        joined: "January 2024",
        phone: "+880 1XXXXXXXXX",
        bio: "I am a passionate learner and I love working with modern technologies.",
    };

    const [isEditing, setIsEditing] = useState(false);

    const [editData, setEditData] = useState({
        displayName: userData.displayName,
        phone: userData.phone,
        bio: userData.bio,
    });

    const handleEditChange = (e) => {
        setEditData({
            ...editData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSave = (e) => {
        e.preventDefault();
        console.log("Saving changes:", editData);
        setIsEditing(false);
    };

    if (!user) {
        return (
            <div className="flex justify-center items-center h-full min-h-64">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    // --- Profile View Section ---
    const renderProfileView = () => (
        <div className="card w-full bg-white shadow-xl p-8 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
                Personal Information
            </h2>

            <div className="space-y-4 text-lg">
                <div className="flex items-center gap-4">
                    <User className="w-5 h-5 text-primary" />
                    <span className="font-semibold text-gray-600 w-32">Name:</span>
                    <span className="text-gray-900">{userData.displayName}</span>
                </div>

                <div className="flex items-center gap-4">
                    <Mail className="w-5 h-5 text-primary" />
                    <span className="font-semibold text-gray-600 w-32">Email:</span>
                    <span className="text-gray-900">{userData.email}</span>
                </div>

                <div className="flex items-center gap-4">
                    <Phone className="w-5 h-5 text-primary" />
                    <span className="font-semibold text-gray-600 w-32">Phone:</span>
                    <span className="text-gray-900">{userData.phone}</span>
                </div>

                <div className="flex items-start gap-4 pt-4">
                    <span className="font-semibold text-gray-600 w-32">Bio:</span>
                    <p className="text-gray-700 leading-relaxed flex-1 whitespace-pre-wrap">
                        {userData.bio}
                    </p>
                </div>
            </div>

            <button
                onClick={() => setIsEditing(true)}
                className="btn btn-primary btn-outline mt-8 w-full md:w-auto"
            >
                <Edit3 className="w-5 h-5 mr-2" />
                Edit Profile
            </button>
        </div>
    );

    // --- Edit Form ---
    const renderEditForm = () => (
        <form
            onSubmit={handleSave}
            className="card w-full bg-white shadow-xl p-8 border border-gray-100"
        >
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
                Edit Profile
            </h2>

            <div className="form-control mb-4">
                <label className="label">
                    <span className="label-text flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Name
                    </span>
                </label>
                <input
                    type="text"
                    name="displayName"
                    value={editData.displayName}
                    onChange={handleEditChange}
                    className="input input-bordered w-full"
                    placeholder="Enter your name"
                    required
                />
            </div>

            <div className="form-control mb-4">
                <label className="label">
                    <span className="label-text flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        Phone Number
                    </span>
                </label>
                <input
                    type="text"
                    name="phone"
                    value={editData.phone}
                    onChange={handleEditChange}
                    className="input input-bordered w-full"
                    placeholder="Enter phone number"
                />
            </div>

            <div className="form-control mb-6">
                <label className="label">
                    <span className="label-text">Bio</span>
                </label>
                <textarea
                    name="bio"
                    value={editData.bio}
                    onChange={handleEditChange}
                    className="textarea textarea-bordered h-24 w-full"
                    placeholder="Write something about yourself..."
                ></textarea>
            </div>

            <div className="flex gap-4">
                <button type="submit" className="btn btn-primary flex-1">
                    <CheckCircle className="w-5 h-5" />
                    Save Changes
                </button>

                <button
                    type="button"
                    onClick={() => {
                        setIsEditing(false);
                        setEditData({
                            displayName: userData.displayName,
                            phone: userData.phone,
                            bio: userData.bio,
                        });
                    }}
                    className="btn btn-ghost flex-1"
                >
                    <XCircle className="w-5 h-5" />
                    Cancel
                </button>
            </div>
        </form>
    );

    return (
        <div className="p-4 md:p-8 bg-gray-50 min-h-full">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-8">
                My Profile
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Sidebar */}
                <div className="lg:col-span-1">
                    <div className="card bg-white shadow-xl p-6 mb-8 text-center border border-gray-100">
                        <div className="avatar mx-auto mb-4 relative">
                            <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden">
                                <img
                                    src={userData.photoURL}
                                    alt="Profile Picture"
                                    className="object-cover w-full h-full"
                                />
                            </div>

                            {/* Upload button */}
                            <label className="absolute bottom-0 right-0 p-2 bg-primary rounded-full text-white cursor-pointer hover:bg-primary-focus transition">
                                <Camera className="w-4 h-4" />
                                <input type="file" className="hidden" accept="image/*" />
                            </label>
                        </div>

                        <h2 className="text-xl font-bold text-gray-800">
                            {userData.displayName}
                        </h2>
                        <p className="text-sm text-gray-500 mb-3">{userData.role}</p>
                        <div className="badge badge-outline text-xs">
                            Joined {userData.joined}
                        </div>
                    </div>

                    {/* Action section */}
                    <div className="card bg-white shadow-xl p-6 border border-gray-100">
                        <h3 className="text-lg font-semibold mb-4 text-gray-800 border-b pb-2">
                            Account Actions
                        </h3>

                        <ul className="menu space-y-2 p-0">
                            <li>
                                <button className="flex items-center gap-2 hover:bg-gray-100 text-gray-700 rounded-lg">
                                    <Lock className="w-5 h-5" />
                                    Change Password
                                </button>
                            </li>
                            <li>
                                <button className="flex items-center gap-2 hover:bg-gray-100 text-error rounded-lg">
                                    <Trash2 className="w-5 h-5" />
                                    Delete Account
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Main Information */}
                <div className="lg:col-span-2">
                    {isEditing ? renderEditForm() : renderProfileView()}
                </div>
            </div>
        </div>
    );
};

export default Profile;
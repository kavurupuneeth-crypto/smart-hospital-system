import React, { useState, useEffect } from 'react';
import axiosInstance from '../../api/axiosInstance';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    bloodGroup: '',
    emergencyContact: ''
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/auth/profile');
      setProfile(response.data.user || {});
    } catch (error) {
      console.error('Failed to fetch profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await axiosInstance.put('/auth/profile', profile);
      if (response.data.success) {
        // Update localStorage if name changed
        localStorage.setItem('userName', profile.name);
        setIsEditing(false);
        alert('Profile updated successfully!');
      }
    } catch (error) {
      alert('Failed to update profile: ' + (error.response?.data?.message || error.message));
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl text-gray-600">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>
          <p className="text-gray-600 mt-2">View and manage your personal information</p>
        </div>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center gap-2"
          >
            <span className="material-symbols-outlined">edit</span>
            Edit Profile
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={() => {
                setIsEditing(false);
                fetchProfile();
              }}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-300 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-gray-400"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        )}
      </div>

      <div className="bg-white rounded-2xl shadow-md p-8">
        <div className="flex items-center mb-8 pb-6 border-b">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center text-white text-4xl font-bold">
            {profile.name?.charAt(0) || 'U'}
          </div>
          <div className="ml-6">
            <h2 className="text-2xl font-bold text-gray-800">{profile.name}</h2>
            <p className="text-gray-600">{profile.email}</p>
            <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
              Patient
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Full Name</label>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={profile.name || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            ) : (
              <p className="text-gray-800 bg-gray-50 px-4 py-2 rounded-lg">{profile.name || '—'}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <p className="text-gray-800 bg-gray-50 px-4 py-2 rounded-lg">{profile.email || '—'}</p>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Phone Number</label>
            {isEditing ? (
              <input
                type="tel"
                name="phone"
                value={profile.phone || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            ) : (
              <p className="text-gray-800 bg-gray-50 px-4 py-2 rounded-lg">{profile.phone || '—'}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Date of Birth</label>
            {isEditing ? (
              <input
                type="date"
                name="dateOfBirth"
                value={profile.dateOfBirth?.split('T')[0] || ''}
                onChange={handleChange}
                max={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            ) : (
              <p className="text-gray-800 bg-gray-50 px-4 py-2 rounded-lg">
                {profile.dateOfBirth ? new Date(profile.dateOfBirth).toLocaleDateString() : '—'}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Gender</label>
            {isEditing ? (
              <select
                name="gender"
                value={profile.gender || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="">Select...</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            ) : (
              <p className="text-gray-800 bg-gray-50 px-4 py-2 rounded-lg capitalize">{profile.gender || '—'}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Blood Group</label>
            {isEditing ? (
              <select
                name="bloodGroup"
                value={profile.bloodGroup || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="">Select...</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            ) : (
              <p className="text-gray-800 bg-gray-50 px-4 py-2 rounded-lg">{profile.bloodGroup || '—'}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-gray-700 font-medium mb-2">Address</label>
            {isEditing ? (
              <textarea
                name="address"
                value={profile.address || ''}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            ) : (
              <p className="text-gray-800 bg-gray-50 px-4 py-2 rounded-lg">{profile.address || '—'}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Emergency Contact</label>
            {isEditing ? (
              <input
                type="tel"
                name="emergencyContact"
                value={profile.emergencyContact || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            ) : (
              <p className="text-gray-800 bg-gray-50 px-4 py-2 rounded-lg">{profile.emergencyContact || '—'}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

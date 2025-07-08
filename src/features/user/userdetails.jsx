import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

const UserDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { users, loading, error } = useSelector((state) => state.users);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (users.length > 0) {
      const existingUser = users.find((u) => u.id.toString() === id.toString());
      setUser(existingUser || null);
    }
  }, [id, users]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 animate-gradient-x">
        <div className="animate-spin h-12 w-12 border-4 border-white border-t-transparent rounded-full" />
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-red-600 text-center mt-10 text-lg font-semibold">
        Error: {error}
      </p>
    );
  }

  if (!user) {
    return (
      <p className="text-center mt-10 text-gray-700 text-lg font-semibold">
        User not found.
      </p>
    );
  }

  return (
    <div className="min-h-screen px-6 py-6 bg-gradient-to-br from-blue-100/10 to-white/80 pt-20 pb-16 flex justify-center items-start">
      <div className="bg-white/90 shadow-xl rounded-2xl max-w-7xl w-full p-10 backdrop-blur-sm border border-gray-200">
        <h1 className="text-4xl font-bold text-gray-900 mb-10 tracking-tight border-b-2 border-blue-500 pb-4 flex items-center gap-2">
          👤 User Details
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-8 text-gray-800">
          <DetailItem label="Full Name" value={user.name} />
          <DetailItem label="Username" value={user.username} />
          <DetailItem label="Email" value={user.email} />
          <DetailItem label="Mobile No." value={user.phone} />
          <DetailItem label="Date of Birth" value={user.dob ? new Date(user.dob).toLocaleDateString() : '-'} />
          <DetailItem label="Gender" value={user.gender || '-'} />

          <div className="col-span-1 sm:col-span-3 lg:col-span-4">
            <h3 className="text-xl font-semibold text-gray-700 mb-2 border-b border-blue-300 pb-1">
              📍 Address
            </h3>
            <div className="pl-4 border-l-4 border-blue-400 text-base space-y-1">
              <p>{user.address?.street || '-'}</p>
              <p>{user.address?.city || '-'}, {user.address?.zipcode || '-'}</p>
              <p>{user.address?.country || '-'}</p>
            </div>
          </div>

          {user.details && (
            <div className="col-span-1 sm:col-span-3 lg:col-span-4">
              <h3 className="text-xl font-semibold text-gray-700 mb-2 border-b border-gray-300 pb-1">
                📝 Additional Details
              </h3>
              <p className="pl-4 border-l-4 border-gray-300 text-base text-gray-700 whitespace-pre-line">
                {user.details}
              </p>
            </div>
          )}
        </div>
<div className="mt-10 flex justify-end gap-4">
  {/* Back Button with Icon */}
  <button
    onClick={() => window.history.back()}
    className="flex items-center gap-2 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg shadow-sm transition"
  >
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
    Back
  </button>

  {/* Edit Form Button with Icon */}
  <button
    onClick={() => navigate(`/edit/${id}`)}
    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-pink-600 transition shadow-lg"
  >
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11 5h6m-6 4h4m1 10H5a2 2 0 01-2-2V5a2 2 0 012-2h7l5 5v11a2 2 0 01-2 2z"
      />
    </svg>
    Edit Form
  </button>
</div>

      </div>
    </div>
  );
};

const DetailItem = ({ label, value }) => (
  <div className="flex flex-col">
    <span className="text-sm font-semibold text-gray-600">{label}</span>
    <span className="mt-1 text-base font-medium text-gray-900">{value || '-'}</span>
  </div>
);

export default UserDetails;

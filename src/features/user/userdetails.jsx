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
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 p-6 flex justify-center items-start">
      <div className="bg-white shadow-2xl rounded-2xl max-w-5xl w-full p-10">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8 tracking-wide">
          User Details
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-gray-800">
          {/* Details */}
          <DetailItem label="Full Name" value={user.name} />
          <DetailItem label="Username" value={user.username} />
          <DetailItem label="Email" value={user.email} />
          <DetailItem label="Mobile No." value={user.phone} />
          <DetailItem
            label="Date of Birth"
            value={user.dob ? new Date(user.dob).toLocaleDateString() : '-'}
          />
          <DetailItem label="Gender" value={user.gender || '-'} />

          {/* Address spanning full width */}
          <div className="sm:col-span-2 md:col-span-3">
            <h3 className="text-xl font-semibold text-gray-700 mb-3 border-b border-blue-500 pb-1">
              Address
            </h3>
            <div className="pl-6 border-l-4 border-blue-500 space-y-1 text-gray-700 text-lg">
              <p>{user.address?.street || '-'}</p>
              <p>
                {user.address?.city || '-'}, {user.address?.zipcode || '-'}
              </p>
              <p>{user.address?.country || '-'}</p>
            </div>
          </div>

          {/* Optional Additional Details */}
          {user.details && (
            <div className="sm:col-span-2 md:col-span-3">
              <h3 className="text-xl font-semibold text-gray-700 mb-3 border-b border-gray-400 pb-1">
                Details
              </h3>
              <p className="pl-6 border-l-4 border-gray-300 text-gray-700 whitespace-pre-line text-lg">
                {user.details}
              </p>
            </div>
          )}
        </div>

        <div className="mt-10 flex justify-end gap-4">
          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 bg-gray-300 hover:bg-gray-400 rounded-xl font-semibold text-gray-700 transition"
          >
            Back
          </button>
          <button
            onClick={() => navigate(`/edit/${id}`)}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-pink-600 transition"
          >
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
    <span className="mt-2 text-lg font-medium text-gray-900">{value || '-'}</span>
  </div>
);

export default UserDetails;

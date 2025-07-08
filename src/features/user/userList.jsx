import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers, deleteUser } from './userSlice.jsx';
import DataTable from 'react-data-table-component';
import { Link, useNavigate } from 'react-router-dom';

function UserList() {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.users);
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const filteredUsers = useMemo(() => {
    if (!searchText) return users;
    const search = searchText.toLowerCase();
    return users.filter(user => (
      user.name.toLowerCase().includes(search) ||
      user.username.toLowerCase().includes(search) ||
      user.email.toLowerCase().includes(search) ||
      (user.phone && user.phone.toLowerCase().includes(search)) ||
      (user.address?.city && user.address.city.toLowerCase().includes(search)) ||
      (user.address?.zipcode && user.address.zipcode.toLowerCase().includes(search))
    ));
  }, [searchText, users]);

  const handleEdit = (id) => navigate(`/edit/${id}`);
  const handleDetails = (id) => navigate(`/details/${id}`);
  const handleDelete = (id) => dispatch(deleteUser(id));

  const customStyles = {
    rows: {
      style: {
        transition: 'all 0.2s ease-in-out',
        ':hover': {
          backgroundColor: '#f0f9ff',
          transform: 'scale(1.005)',
        },
      },
    },
    headCells: {
      style: {
        fontWeight: 'bold',
        backgroundColor: '#e0e7ff',
        color: '#1e40af',
        fontSize: '14px',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
      },
    },
    cells: {
      style: {
        fontSize: '14px',
        padding: '12px 14px',
      },
    },
  };

  const columns = [
    {
      name: 'Sr.No',
      width: '80px',
      cell: (row, index) => index + 1,
    },
    { name: 'Name', selector: row => row.name, sortable: true },
    { name: 'Username', selector: row => row.username, sortable: true },
    { name: 'Email', selector: row => row.email, sortable: true },
    {
      name: 'ZIP Code',
      selector: row => row.address?.zipcode,
      sortable: true,
    },
    {
      name: 'Mobile No.',
      selector: row => row.phone,
      sortable: true,
    },
    {
      name: 'City',
      selector: row => row.address?.city,
      sortable: true,
      cell: row => (
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700">
          {row.address?.city}
        </span>
      ),
    },
    {
      name: 'Actions',
      cell: row => (
        <div className="flex gap-3 items-center">
          <button
            onClick={() => handleEdit(row.id)}
            className="hover:scale-110 transition-transform duration-150"
            title="Edit"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500 hover:text-indigo-700" fill="currentColor" viewBox="0 0 20 20">
              <path d="M17.414 2.586a2 2 0 010 2.828l-9.9 9.9a1 1 0 01-.39.24l-4 1.33a1 1 0 01-1.263-1.264l1.33-4a1 1 0 01.24-.389l9.9-9.9a2 2 0 012.828 0z" />
            </svg>
          </button>
          <button
            onClick={() => handleDetails(row.id)}
            className="hover:scale-110 transition-transform duration-150"
            title="Details"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700 hover:text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 19a7 7 0 100-14 7 7 0 000 14z" />
            </svg>
          </button>
          <button
            onClick={() => handleDelete(row.id)}
            className="hover:scale-110 transition-transform duration-150"
            title="Delete"
          >
            <svg className="w-5 h-5 text-red-500 hover:text-red-700" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3m-4 0h14" />
            </svg>
          </button>
        </div>
      ),
      ignoreRowClick: true,
      button: true,
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white">
        <div className="animate-spin h-12 w-12 border-4 border-indigo-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-600 mt-10 text-lg">Error: {error}</p>;
  }

  return (
    <div className="min-h-screen px-6 py-6 bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-20 pb-16">
      <div className="max-w-7xl mx-auto bg-white/80 backdrop-blur-md rounded-xl shadow-2xl shadow-indigo-100 overflow-hidden">
        <div className="flex justify-between items-center border-b px-6 py-4 bg-white/80">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-fade-in">
            👥 User Management
          </h2>
          <Link
            to="/create"
            className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 text-white px-4 py-2 rounded-lg transition-transform transform hover:scale-105 shadow-md"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Add User
          </Link>
        </div>

        <div className="px-6 py-4">
          <div className="relative w-full max-w-md mb-5">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z" />
              </svg>
            </div>
            <input
              type="search"
              placeholder="Search users..."
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
              className="w-full md:w-96 pr-5 pl-10 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <DataTable
            columns={columns}
            data={filteredUsers}
            pagination
            highlightOnHover
            striped
            persistTableHead
            customStyles={customStyles}
          />
        </div>
      </div>
    </div>
  );
}

export default UserList;

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers, deleteUser } from './userSlice.jsx';
import DataTable from 'react-data-table-component';
import { Link, useNavigate } from 'react-router-dom';

function UserList() {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.users);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleEdit = (id) => navigate(`/edit/${id}`);
  const handleDetails = (id) => navigate(`/details/${id}`);
  const handleDelete = (id) => dispatch(deleteUser(id));

  const customStyles = {
    rows: {
      style: {
        transition: 'all 0.2s ease-in-out',
        ':hover': {
          backgroundColor: '#f9fafb',
          transform: 'scale(1.01)',
        },
      },
    },
    headCells: {
      style: {
        fontWeight: 'bold',
        backgroundColor: '#eff6ff',
        paddingTop: '14px',
        paddingBottom: '14px',
      },
    },
    cells: {
      style: {
        padding: '12px 14px',
        fontSize: '14px',
      },
    },
  };

  const columns = [
    { name: 'Sr.No', selector: row => row.id, sortable: true, width: '80px' },
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
        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full">
          {row.address?.city}
        </span>
      ),
    },
    {
      name: 'Actions',
      cell: row => (
        <div className="flex gap-3 items-center">
          {/* Edit */}
          <button
            onClick={() => handleEdit(row.id)}
            className="hover:scale-110 transition-transform"
            title="Edit"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-indigo-500 hover:text-indigo-700"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M17.414 2.586a2 2 0 010 2.828l-9.9 9.9a1 1 0 01-.39.24l-4 1.33a1 1 0 01-1.263-1.264l1.33-4a1 1 0 01.24-.389l9.9-9.9a2 2 0 012.828 0z" />
            </svg>
          </button>

          {/* Details */}
          <button
            onClick={() => handleDetails(row.id)}
            className="hover:scale-110 transition-transform"
            title="Details"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-700 hover:text-gray-900"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 16h-1v-4h-1m1-4h.01M12 19a7 7 0 100-14 7 7 0 000 14z"
              />
            </svg>
          </button>

          {/* Delete */}
          <button
            onClick={() => handleDelete(row.id)}
            className="hover:scale-110 transition-transform"
            title="Delete"
          >
            <svg
              className="w-5 h-5 text-red-500 hover:text-red-700"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3m-4 0h14"
              />
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
        <div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-600 mt-10 text-lg">Error: {error}</p>;
  }

  return (
    <div className="min-h-screen px-6 py-6 bg-gradient-to-br from-blue-50 to-white pt-20 pb-16">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg shadow-gray-400 overflow-hidden">
        <div className="flex justify-between items-center border-b px-6 py-4 bg-white">
          <h2 className="text-2xl font-semibold text-gray-800 animate-fade-in">
            👥 User Management
          </h2>
          <Link
            to="/create"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-300 ease-in-out shadow-md"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Add User
          </Link>
        </div>

        <div className="px-6 py-4">
          <DataTable
            columns={columns}
            data={users}
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

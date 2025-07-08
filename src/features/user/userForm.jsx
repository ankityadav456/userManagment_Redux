import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser, addUser } from './userSlice.jsx';
import { useNavigate, useParams, Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const UserForm = () => {
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.users);
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const [form, setForm] = useState({
    name: '',
    username: '',
    email: '',
    address: { zipcode: '', city: '', street: '', country: '' },
    id: null,
    phone: '',
    dob: null,
    gender: '',
    password: '',
  });

  useEffect(() => {
    if (isEditMode && users.length > 0) {
      const existingUser = users.find((user) => user.id.toString() === id.toString());
      if (existingUser) setForm(existingUser);
    }
  }, [id, users, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setErrors((prev) => ({ ...prev, [name]: '' }));

    if (['zipcode', 'city', 'street', 'country'].includes(name)) {
      setForm((prevForm) => ({
        ...prevForm,
        address: {
          ...prevForm.address,
          [name]: value,
        },
      }));
    } else {
      setForm((prevForm) => ({
        ...prevForm,
        [name]: value,
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.username.trim()) newErrors.username = 'Username is required';
    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!form.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (form.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (!form.gender.trim()) newErrors.gender = 'Gender is required';
    if (!form.dob) newErrors.dob = 'Date of Birth is required';

    const address = form.address || {};
    if (!address.street.trim()) newErrors.street = 'Street is required';
    if (!address.city.trim()) newErrors.city = 'City is required';
    if (!address.country.trim()) newErrors.country = 'Country is required';
    if (!address.zipcode.trim()) newErrors.zipcode = 'ZIP Code is required';

    if (!form.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10,15}$/.test(form.phone)) {
      newErrors.phone = 'Phone must be 10–15 digits';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    if (isEditMode) {
      dispatch(updateUser(form));
    } else {
      dispatch(addUser(form));
    }
    navigate('/');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 animate-pulse">
        <div className="animate-spin h-12 w-12 border-4 border-white border-t-transparent rounded-full" />
      </div>
    );
  }

  if (error)
    return (
      <p className="text-red-600 text-center mt-10 text-lg font-semibold">
        Error: {error}
      </p>
    );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-indigo-100 via-purple-100 to-pink-100 pt-24 pb-16 px-4">
      <div className="w-full max-w-5xl bg-white/90 backdrop-blur-lg shadow-2xl rounded-xl p-10 border border-gray-200">
        <h2 className="text-3xl font-extrabold text-transparent bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 bg-clip-text text-center mb-10">
          {isEditMode ? 'Update User Details' : 'Add New User'}
        </h2>


<form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-6">
  {['name', 'username', 'email', 'password', 'phone'].map((field) => (
    <div key={field}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {field.charAt(0).toUpperCase() + field.slice(1)} <span className="text-red-500">*</span>
      </label>
      <input
        type={field === 'password' ? 'password' : 'text'}
        name={field}
        placeholder={`Enter ${field}`}
        value={form[field]}
        onChange={handleChange}
        className={`w-full px-4 py-3 rounded-lg border ${
          errors[field] ? 'border-red-500 ring-1 ring-red-400 animate-pulse' : 'border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300'
        } focus:outline-none shadow-sm`}
      />
      {errors[field] && <p className="text-sm text-red-500 mt-1">{errors[field]}</p>}
    </div>
  ))}

  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Gender <span className="text-red-500">*</span>
    </label>
    <select
      name="gender"
      value={form.gender}
      onChange={handleChange}
      className={`w-full px-4 py-3 rounded-lg border ${
        errors.gender ? 'border-red-500 ring-1 ring-red-400 animate-pulse' : 'border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300'
      } focus:outline-none shadow-sm`}
    >
      <option value="">Select Gender</option>
      <option value="male">Male</option>
      <option value="female">Female</option>
      <option value="other">Other</option>
    </select>
    {errors.gender && <p className="text-sm text-red-500 mt-1">{errors.gender}</p>}
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Date of Birth <span className="text-red-500">*</span>
    </label>
    <DatePicker
      selected={form.dob ? new Date(form.dob) : null}
      onChange={(date) => {
        setForm({ ...form, dob: date });
        setErrors((prev) => ({ ...prev, dob: '' }));
      }}
      maxDate={new Date()}
      dateFormat="yyyy-MM-dd"
      placeholderText="Select DOB"
      className={`w-full px-4 py-3 rounded-lg border ${
        errors.dob ? 'border-red-500 ring-1 ring-red-400 animate-pulse' : 'border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300'
      } focus:outline-none shadow-sm`}
      showMonthDropdown
      showYearDropdown
      dropdownMode="select"
      withPortal
    />
    {errors.dob && <p className="text-sm text-red-500 mt-1">{errors.dob}</p>}
  </div>

  {['street', 'city', 'country', 'zipcode'].map((field) => (
    <div key={field}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {field.charAt(0).toUpperCase() + field.slice(1)} <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        name={field}
        placeholder={`Enter ${field}`}
        value={form.address[field] || ''}
        onChange={handleChange}
        className={`w-full px-4 py-3 rounded-lg border ${
          errors[field] ? 'border-red-500 ring-1 ring-red-400 animate-pulse' : 'border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300'
        } focus:outline-none shadow-sm`}
      />
      {errors[field] && <p className="text-sm text-red-500 mt-1">{errors[field]}</p>}
    </div>
  ))}
<div className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4 flex justify-between mt-6">
  {/* Back Button with Icon */}
  <Link
    to="/"
    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-semibold transition duration-300 bg-gray-200 px-6 py-3 rounded-lg shadow-md"
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
  </Link>

  {/* Submit Button with Icon */}
  <button
    type="submit"
    className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-600 transition duration-300 shadow-md"
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
        d="M5 13l4 4L19 7"
      />
    </svg>
    {isEditMode ? 'Update User' : 'Add User'}
  </button>
</div>

</form>

      </div>
    </div>
  );
};

export default UserForm;

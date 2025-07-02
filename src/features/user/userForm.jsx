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

    if (!form?.name?.trim()) newErrors.name = 'Name is required';
    if (!form?.username?.trim()) newErrors.username = 'Username is required';

    if (!form?.email?.trim()) {
        newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
        newErrors.email = 'Email is invalid';
    }

    if (!form?.password?.trim()) {
        newErrors.password = 'Password is required';
    } else if (form.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
    }

    if (!form?.gender?.trim()) newErrors.gender = 'Gender is required';
    if (!form?.dob) newErrors.dob = 'Date of Birth is required';

    const address = form?.address || {};
    if (!address?.street?.trim()) newErrors.street = 'Street is required';
    if (!address?.city?.trim()) newErrors.city = 'City is required';
    if (!address?.country?.trim()) newErrors.country = 'Country is required';
    if (!address?.zipcode?.trim()) newErrors.zipcode = 'ZIP Code is required';

    if (!form?.phone?.trim()) {
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
            <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 animate-gradient-x">
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
        <div className="min-h-screen bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 flex justify-center items-start p-6 animate-gradient-bg">
            <div className="w-full max-w-7xl bg-white shadow-2xl rounded-2xl border border-gray-200">
                <form onSubmit={handleSubmit} className="p-8">
                    <div className="flex justify-between items-center border-b border-gray-300 pb-4 mb-6">
                        <h2 className="text-3xl font-extrabold text-gray-900 tracking-wide">
                            {isEditMode ? 'Edit User' : 'Add New User'}
                        </h2>
                    </div>

                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {/* Input Fields */}
                        {[
                            {
                                label: 'Full Name',
                                name: 'name',
                                type: 'text',
                                placeholder: 'Enter Full Name',
                                required: true,
                            },
                            {
                                label: 'Username',
                                name: 'username',
                                type: 'text',
                                placeholder: 'Enter Username',
                                required: true,
                            },
                            {
                                label: 'Email',
                                name: 'email',
                                type: 'text',
                                placeholder: 'Enter Email',
                                required: true,
                            },
                            {
                                label: 'Password',
                                name: 'password',
                                type: 'password',
                                placeholder: 'Enter Password',
                                required: true,
                            },
                            {
                                label: 'Gender',
                                name: 'gender',
                                type: 'select',
                                options: [
                                    { value: '', text: 'Select Gender' },
                                    { value: 'male', text: 'Male' },
                                    { value: 'female', text: 'Female' },
                                    { value: 'other', text: 'Other' },
                                ],
                                required: true,
                            },
                        ].map(({ label, name, type, placeholder, options, required }) => (
                            <div key={name} className="flex flex-col">
                                <label className="text-sm font-semibold mb-1 text-gray-700">
                                    {label} {required && <span className="text-red-500">*</span>}
                                </label>
                                {type === 'select' ? (
                                    <select
                                        name={name}
                                        value={form[name]}
                                        onChange={handleChange}
                                        className={`px-4 py-3 rounded-lg border-2 transition-colors duration-300 focus:outline-none ${errors[name]
                                                ? 'border-red-500 ring-2 ring-red-400'
                                                : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-400'
                                            } bg-white shadow-sm`}
                                    >
                                        {options.map(({ value, text }) => (
                                            <option key={value} value={value}>
                                                {text}
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    <input
                                        type={type}
                                        name={name}
                                        placeholder={placeholder}
                                        value={form[name]}
                                        onChange={handleChange}
                                        className={`px-4 py-3 rounded-lg border-2 transition-colors duration-300 focus:outline-none ${errors[name]
                                                ? 'border-red-500 ring-2 ring-red-400 animate-pulse'
                                                : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-400'
                                            } bg-white shadow-sm`}
                                    />
                                )}
                                {errors[name] && (
                                    <span className="text-xs text-red-600 mt-1 font-semibold">
                                        {errors[name]}
                                    </span>
                                )}
                            </div>
                        ))}

                        {/* Date Picker */}
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold mb-1 text-gray-700">
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
                                placeholderText="Select Date of Birth"
                                showMonthDropdown
                                showYearDropdown
                                dropdownMode="select"
                                withPortal
                                className={`w-full px-4 py-3 rounded-lg border-2 transition-colors duration-300 focus:outline-none ${errors.dob
                                        ? 'border-red-500 ring-2 ring-red-400 animate-pulse'
                                        : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-400'
                                    } bg-white shadow-sm`}
                            />
                            {errors.dob && (
                                <span className="text-xs text-red-600 mt-1 font-semibold">
                                    {errors.dob}
                                </span>
                            )}
                        </div>

                        {/* Address Inputs */}
                        {[
                            { label: 'Street', name: 'street' },
                            { label: 'City', name: 'city' },
                            { label: 'Country', name: 'country' },
                            { label: 'ZIP Code', name: 'zipcode' },
                        ].map(({ label, name }) => (
                            <div key={name} className="flex flex-col">
                                <label className="text-sm font-semibold mb-1 text-gray-700">
                                    {label} <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name={name}
                                    placeholder={`Enter ${label}`}
                                    value={form.address[name] || ''}
                                    onChange={handleChange}
                                    className={`px-4 py-3 rounded-lg border-2 transition-colors duration-300 focus:outline-none ${errors[name]
                                            ? 'border-red-500 ring-2 ring-red-400 animate-pulse'
                                            : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-400'
                                        } bg-white shadow-sm`}
                                />
                                {errors[name] && (
                                    <span className="text-xs text-red-600 mt-1 font-semibold">
                                        {errors[name]}
                                    </span>
                                )}
                            </div>
                        ))}

                        {/* Phone Input */}
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold mb-1 text-gray-700">
                                Mobile No. <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="phone"
                                placeholder="Enter Mobile No."
                                value={form.phone}
                                onChange={handleChange}
                                className={`px-4 py-3 rounded-lg border-2 transition-colors duration-300 focus:outline-none ${errors.phone
                                        ? 'border-red-500 ring-2 ring-red-400 animate-pulse'
                                        : 'border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-400'
                                    } bg-white shadow-sm`}
                            />
                            {errors.phone && (
                                <span className="text-xs text-red-600 mt-1 font-semibold">
                                    {errors.phone}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="mt-8 flex justify-between items-center">
                        <Link
                            to="/"
                            className="text-gray-600 hover:text-gray-900 font-semibold transition duration-300 bg-gray-300 px-8 py-3 rounded-lg shadow-lg "
                        >
                            Back
                        </Link>
                        <button
                            type="submit"
                            className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-8 py-3 rounded-lg shadow-lg font-semibold hover:from-purple-700 hover:to-pink-600 transition duration-300"
                        >
                            {isEditMode ? 'Update User' : 'Add User'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserForm;

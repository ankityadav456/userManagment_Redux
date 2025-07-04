import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Header = () => {
    return (
        <header className="fixed top-0 z-10 w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 shadow-md mb-10">
            <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
                <Link to="/" className="text-white text-3xl font-extrabold tracking-wide">
                    UserApp
                </Link>
                <nav className="space-x-6">
                    <NavLink
                        to="/"
                        end
                        className={({ isActive }) =>
                            isActive
                                ? 'text-white font-semibold border-b-2 border-white pb-1'
                                : 'text-white hover:border-b-2 hover:border-white pb-1 transition'
                        }
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/create"
                        className={({ isActive }) =>
                            isActive
                                ? 'text-white font-semibold border-b-2 border-white pb-1'
                                : 'text-white hover:border-b-2 hover:border-white pb-1 transition'
                        }
                    >
                        Add User
                    </NavLink>
                </nav>
            </div>
        </header>
    );
};

export default Header;

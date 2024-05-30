import React from 'react';
import { Link, useNavigate, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearUser } from '../actions/userActions'; // Import the action to clear user data

const NavBar = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user); // Access user data from Redux store
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(clearUser()); // Dispatch the action to clear user data
    // Additional logout logic here (e.g., API call, clear localStorage, etc.)
    navigate('/login');
  };

  return (
    <>
      <nav>
        <li>
          <Link to="/">JobHunter</Link>
        </li>
        {!user.id ? (
          <>
            <li>
              <Link to="/Register">Register</Link>
            </li>
            <li>
              <Link to="/Login">Login</Link>
            </li>
          </>
        ) : user.role === 'jobseeker' ? (
          <>
            <li>
              <Link to="/Profile">My Profile</Link>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </>
        ) : user.role === 'company' ? (
          <>
            <li>
              <Link to="/Profile">My Profile</Link>
            </li>
            <li>
              <Link to="/ManageJob">Add Job Listing</Link>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </>
        ) : null}
      </nav>
      <Outlet />
    </>
  );
};

export default NavBar;

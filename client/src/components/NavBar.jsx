import React from 'react';
import { Link, useNavigate, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearUser } from '../actions/userActions';

const NavBar = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(clearUser());
    localStorage.clear();
    navigate('/login');
  };

  return (
    <>
      <style>
        {`
          nav {
            background-color: #f9f9f9;
            border-bottom: 5px solid #213547;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px;
          }
          nav ul {
            list-style-type: none;
            margin: 0;
            padding: 0;
          }
          nav li {
            display: inline-block;
            margin-right: 10px;
          }
          nav a {
            color: #213547;
            text-decoration: none;
            font-size: 25px;
          }
          nav button {
            background-color: transparent;
            border: none;
            color: #213547;
            cursor: pointer;
            font-size: 25px;
          }
        `}
      </style>
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

import React from 'react';
import { Link, useNavigate, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearUser } from '../../actions/userActions';

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
            background-color: #213547;
            border-bottom: 5px solid #f9f9f9;
            display: flex;
            align-items: center;
            padding: 10px;
          }
          nav li {
            display: inline-block;
            margin-right: 10px;
          }
          nav a {
            color: #f9f9f9;
            text-decoration: none;
            font-size: 25px;
            margin-right: 40px;
          }
            .background {
            margin: 15px;
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
              <Link to="/Login" onClick={handleLogout}>Logout</Link>
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
              <Link to="/Login" onClick={handleLogout}>Logout</Link>
            </li>
          </>
        ) : null}
      </nav>
      <Outlet />
    </>
  );
};

export default NavBar;

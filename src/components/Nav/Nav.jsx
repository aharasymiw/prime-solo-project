import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useDispatch, useSelector } from 'react-redux';

function Nav() {
  const user = useSelector((store) => store.user);

  const dispatch = useDispatch();

  const reset = () => {
    dispatch({ type: 'NEW_PATIENT_CLEAR_CACHE' });
  }

  return (
    <div className="nav">
      <NavLink to="/calculator" onClick={reset}>
        <h2 className="nav-title">NICU Calc</h2>
      </NavLink>
      <div>
        {/* If no user is logged in, show these links */}
        {!user.uuid && (
          // If there's no user, show login/registration and calculator links
          <>
            <Link className="navLink" to="/calculator">
              Calculator
            </Link>

            <Link className="navLink" to="/login">
              Login
            </Link>
          </>
        )}

        {/* If a user is logged in, show these links */}
        {user.uuid && (
          <>
            <Link className="navLink" to="/calculator">
              Calculator
            </Link>

            {/* <Link className="navLink" to="/profile">
              Profile
            </Link> */}

            <LogOutButton className="navLink" />
          </>
        )}

        <Link className="navLink" to="/about">
          About
        </Link>
      </div>
    </div>
  );
}

export default Nav;

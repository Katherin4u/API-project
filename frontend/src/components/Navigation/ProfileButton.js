// / frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import DemoUserModal from "../demoUserModal";
import { useHistory } from "react-router-dom";
import './Navigation.css'

function ProfileButton({ user }) {
  // const spot = useSelector((state) => state.spots.singleSpot);
  const history = useHistory()
  // const user = useSelector((state) => state.session);
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const sessionUser = useSelector((state) => state.session.user);


  const handleCreateSpot = (e) => {
    e.preventDefault();
    history.push(`/spots/create`);
  };

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu, sessionUser]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
  };



  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  return (
    <div>
      <button onClick={openMenu} className="profile-btn">
        <i className="fa-sharp fa-solid fa-bars"></i>
        <i className="fas fa-user-circle" />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        <ul className="list-profile-dropdown">
          {user && sessionUser ? (
            <div>
              <div className="user-username">
                <div className="username">
                  Username:
                </div>
                <li className="user-username">{user.username}</li>
              </div>
              <div className="first-last-div">
                <div className="first-last">
                  Name:
                </div>
                <li className="user-first-last-name">{user.firstName} {user.lastName}</li>
              </div>
              <div className="email-div">
                <div className="email">
                  Email:
                </div>
                <li className="user-email">{user.email}</li>
              </div>
              <li className='logout-btn'>
                <button onClick={logout}>Log Out</button>
              </li>
              <li className="create-btn">
                <button onClick={(e) => handleCreateSpot(e)}
                  className="createSpot-button"
                >
                  Create Spot
                </button>
              </li>
            </ div>
          ) : (
            <>
              <li className="button-dropdown-item">
                <OpenModalMenuItem
                  itemText="Log In"
                  onItemClick={closeMenu}
                  modalComponent={<LoginFormModal />}
                />
              </li>
              <li className="button-dropdown-item">
                <OpenModalMenuItem
                  itemText="Sign Up"
                  onItemClick={closeMenu}
                  modalComponent={<SignupFormModal />}
                />
              </li>
              <li className="button-dropdown-item">
                <OpenModalMenuItem
                  itemText="Demo Login"
                  onItemClick={closeMenu}
                  modalComponent={<DemoUserModal />}
                />
              </li>

            </>
          )}
        </ul>
      </ul>
    </div>
  );
}

export default ProfileButton;
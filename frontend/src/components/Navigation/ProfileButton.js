// / frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect, useRef } from "react";
import { useDispatch} from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalButton from '../OpenModalButton';
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
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);
  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <div>
      <button onClick={openMenu}  className="profile-btn">
        <i className="fas fa-user-circle" />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        <ul className="list-profile-dropdown">
        {user ? (
            <div>
              <li>{user.username}</li>
              <li>{user.firstName} {user.lastName}</li>
              <li>{user.email}</li>
              <li>
                <button onClick={logout}>Log Out</button>
              </li>
              <li>
                <button onClick={(e) => handleCreateSpot(e)}
                  className="createSpot-button"
                >
                  Create Spot
                </button>
              </li>
            </ div>
            ) : (
            <>
              <li  className="button-dropdown-item">
                <OpenModalButton
                  buttonText="Log In"
                  modalComponent={<LoginFormModal />}
                />
              </li>
              <li className="button-dropdown-item">
                <OpenModalButton
                  buttonText="Sign Up"
                  modalComponent={<SignupFormModal />}
                />
              </li>
              <li className="button-dropdown-item">
                <OpenModalButton
                  buttonText="Demo Login"
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
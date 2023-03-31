// / frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import DemoUserModal from "../demoUserModal";
import { useHistory, useLocation } from "react-router-dom";
import './Navigation.css'

function ProfileButton({ user }) {
  // const spot = useSelector((state) => state.spots.singleSpot);
  const history = useHistory()
  const location = useLocation();

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
    history.push('/')
    closeMenu();

    if (location.pathname === '/spots/create') {
      history.push('/')
    }
  };



  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  return (
    <div>
      <button onClick={openMenu} className="profile-btn">
        <i className="fa-sharp fa-solid fa-bars"></i>
        <i className="fas fa-user-circle" />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        <div className="list-profile-dropdown">
          {user && sessionUser ? (
            <div>
              <div className="userInformation">
                <div className="user-username">
                  <div className="username">
                  </div>
                  <li className="user-username">{user.username}</li>
                </div>
                
                <div className="email-div">
                  <li className="user-email">{user.email}</li>
                </div>
              </div>
              <div className="lastTwo" style={{paddingBottom: "5px"}}>
                <li className='logout-btn'>
                  <button onClick={(e) => handleCreateSpot(e)} className='createSpotButton' style={{padding:"10px"}}>
                    Create Spot
                  </button>
                </li>
              </div>
                <li className="create-btn" style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                  <button className='createSpotButton' onClick={logout} style={{padding: "10px"}}>Log Out</button>
                </li>
            </ div>
          ) : (
            <div className="dropdown-things">
              <div className="button-dropdown-item">
                <OpenModalMenuItem
                  itemText="Log In"
                  onItemClick={closeMenu}
                  modalComponent={<LoginFormModal />}
                />
              </div>
              <div className="button-dropdown-item">
                <OpenModalMenuItem
                  itemText="Sign Up"
                  onItemClick={closeMenu}
                  modalComponent={<SignupFormModal />}
                />
              </div>
              <div className="button-dropdown-item">
                <OpenModalMenuItem
                  itemText="Demo Login"
                  onItemClick={closeMenu}
                  modalComponent={<DemoUserModal />}
                />
              </div>

            </div>
          )}
        </div>
      </ul>
    </div>
  );
}

export default ProfileButton;
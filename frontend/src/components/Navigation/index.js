// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);



  return (
    <div className='nav-main'>
      <div className='nav'>
        <NavLink exact to="/">
          <span className='title'>
              <i class="fa-solid fa-warehouse">
              &nbsp;Airbnb-Dupe
              </i>
          </span>
        </NavLink>
      </div>
      <div className='nav-three'>
        <div className='button-div'>
          {isLoaded && (
            <ProfileButton user={sessionUser}
            />
          )}

        </div>
      </div>
    </div>

  );
}

export default Navigation;
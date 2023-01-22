// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import * as sessionActions from '../../store/session';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  const history = useHistory()

  const handleCreateSpot = (e) => {
    e.preventDefault();
    history.push(`/spots/create`);
  };

  return (
    <div className='nav-main'>
      <div className='nav'>
        <NavLink exact to="/">
          <span className='title'>
            <i class="fa-solid fa-warehouse">
              &nbsp;Brb-dupe
            </i>
          </span>
        </NavLink>
      </div>
      <div className='nav-three'>
        {sessionUser ? (
          <button onClick={(e) => handleCreateSpot(e)} className='createSpotButton'>
            Create Spot
          </button>
        ) : (<div></div>)}
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
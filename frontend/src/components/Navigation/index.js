// frontend/src/components/Navigation/index.js
import React, { useState } from 'react';
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
        {/* <span className='title'>
          <img src={process.env.PUBLIC_URL + '/favicon-house.png'}></img>
          <h3>
            dupe-brb-loka
          </h3>
        </span> */}
        {sessionUser ? (
          <div className="create-middle-buttons">
            <NavLink exact to="/spots" style={{ all: 'unset' }} className="otherNav">
              <span className='title'>
                <img src={process.env.PUBLIC_URL + '/favicon-house.png'}></img>
                <h3>
                  dupe-brb-loka
                </h3>
              </span>
            </NavLink>
            <div className='middle-buttons'>
              <div className='middle-button-modal-thing'>
                <div className='Anywhere'> Anywhere</div>
                <div className='any-week'> Any week</div>
                <div className='add-guests'> coming soon</div>
                <div className='button-search-thing'>
                  <i style={{color:'white', padding: '4px'}} class="fa-solid fa-magnifying-glass"></i>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <span className='title'>
            <img src={process.env.PUBLIC_URL + '/favicon-house.png'}></img>
            <h3>
              dupe-brb-loka
            </h3>
          </span>
        )}
      </div>
      <div className='nav-three'>
        {sessionUser ? (
          <div className="create-middle-buttons">
            <button onClick={(e) => handleCreateSpot(e)} className='createASpotButton'>
              Create Spot
            </button>
          </div>
        ) : (<div></div>)}
        <div className='button-div'>
          {isLoaded && (
            <div>
              <ProfileButton user={sessionUser} />
            </div>
          )}

        </div>
      </div>
    </div>

  );
}

export default Navigation;
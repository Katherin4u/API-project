// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation/index";
import CreateSpot from "./components/CreateASpot/createSpot";
import EditSpot from "./components/EditSpot/editSpot";
import AllSpots from "./components/allTheSpots";



function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <div className="main-container">
      <Navigation isLoaded={isLoaded} />
      <main id='Content' >
        {isLoaded && (
          <Switch>
            <Route path='/spots/create'>
              <CreateSpot />
            </Route>
            <Route path='/spots/:spotId/edit'>
              <EditSpot />
            </Route>
            <Route path='/spots'>
              <AllSpots />
            </Route>
            <Route exact path='/'>
              <AllSpots />
            </Route>
          </Switch>
        )}
      </main>

    </div>
  );
}

export default App;
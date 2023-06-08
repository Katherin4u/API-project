// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation/index";
import AllSpots from "./components/allTheSpots";
import SingleSpot from "./components/SingleSpot";
import CreateSpot from "./components/CreateASpot/createSpot";
import EditSpotModal from "./components/EditSpotModal/editSpot";
import SplashPage from "./components/SplashPage/index"
import Footer from "./components/Footer";
import NotFound from "./components/PageNotFound";
import RouteChangeTracker from "./components/RouteChangeTracker";




function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <div className="main-container">
        <Navigation isLoaded={isLoaded} />
        <RouteChangeTracker />
        <main id='Content' >
          {isLoaded && (
            <Switch>
              <Route path="/spots/:spotId/edit">
                <EditSpotModal />
                <Footer />
                <RouteChangeTracker />
              </Route>
              <Route path="/spots/create">
                <CreateSpot />
                <Footer />
                <RouteChangeTracker />
              </Route>
              <Route path='/spots/:spotId'>
                <SingleSpot />
                <Footer />
                <RouteChangeTracker />
              </Route>
              <Route exact path='/'>
                <SplashPage />
                <RouteChangeTracker />
              </Route>
              <Route path='/spots'>
                <AllSpots />
                <Footer />
                <RouteChangeTracker />
              </Route>
              <Route path='/'>
                <NotFound />
                <RouteChangeTracker />
              </Route>
              {/* <Route exact path='/'>
                <AllSpots />
              </Route> */}
            </Switch>
          )}
        </main>

      </div>
    </>
  );
}

export default App;
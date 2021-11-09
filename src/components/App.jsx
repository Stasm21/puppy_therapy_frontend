import React, { useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import OwnerNavBar from "./Navbars/OwnerNavBar/OwnerNavBar";
import RenterNavBar from "./Navbars/RenterNavBar/RenterNavBar";
import DefaultNavBar from "./Navbars/DefaultNavBar/DefaultNavBar";
import OwnerProfile from "./pages/Profile/OwnerProfile";
import RenterProfile from "./pages/Profile/RenterProfile";
import PrivateRoute from "./Routes/PrivateRoute";
import { useStore } from "../store/Store";
import { routes } from "./Routes/routes";
import PageNotFound from "./pages/ErrorPage/PageNotFound";
import PostPuppy from "./pages/Owner/PostPuppy";
import MyPuppy from "./pages/Owner/MyPuppies";
import axios from "axios";
import Bookings from "./pages/Owner/Bookings";
import BaseProfile from "./pages/Profile/BaseProfile";
import BaseProfileView from "./pages/Profile/DogProfile/BaseProfileView";
import SinglePuppy from "./pages/SinglePuppy/SinglePuppy";
import Appointments from "./pages/Renter/Appointments";
import AllPuppies from "./pages/AllPuppies/AllPuppies";

const App = () => {
  const accessToken = useStore((state) => state.accessToken);
  const userInfo = useStore((state) => state.userInfo);
  const setUserInfo = useStore((state) => state.setUserInfo);
  useEffect(() => {
    setUserInfo(accessToken);
    window.document.title = 'Puppy Therapy'
  }, []);

  return (
    <>
      {!accessToken ? (
        <DefaultNavBar />
      ) : (
        (userInfo?.userType == "Renter" && <RenterNavBar />) ||
        (userInfo && userInfo.userType == "Owner" && <OwnerNavBar />)
      )}
      <Switch>
        <Route exact path={routes.login} component={Login} />
        <Route exact path={routes.register} component={Register} />
        <Route exact path={routes.home}>
          {!accessToken ? (
            <Login />
          ) : (
            <Redirect
              to={
                userInfo?.userType == "Owner"
                  ? routes.allPups
                  : userInfo?.userType == "Renter" && routes.allPups
              }
            />
          )}
        </Route>
        <PrivateRoute
          exact
          path={routes.ownerProfile}
          component={OwnerProfile}
        />
        <PrivateRoute
          exact
          path={routes.renterProfile}
          component={RenterProfile}
        />
        <PrivateRoute
          exact
          path={routes.ownerPostPuppy}
          component={PostPuppy}
        />
        <PrivateRoute exact path={routes.ownerMyPups} component={MyPuppy} />
        <PrivateRoute
          exact
          path={routes.ownerAvailability}
          component={Bookings}
        />
        <PrivateRoute
          exact
          path={`${routes.singleProfileWithId}/:id`}
          component={BaseProfileView}
        />
        <PrivateRoute
          exact
          path={`${routes.singlePupWithId}/:id`}
          component={SinglePuppy}
        />
        <PrivateRoute
          exact
          path={routes.renterAppointments}
          component={Appointments}
        />
        <PrivateRoute exact path={routes.allPups} component={AllPuppies} />

        <Route exact path="/404" component={PageNotFound} />
        <Redirect to="/404" />
      </Switch>
    </>
  );
};

export default App;

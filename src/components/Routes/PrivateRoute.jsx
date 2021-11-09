import React from "react";
import { useStore } from "../../store/Store";
import { Redirect, Route } from "react-router-dom";
import { routes } from "./routes";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const accessToken = useStore((state) => state.accessToken);

  return (
    <Route
      {...rest}
      render={(props) =>
        accessToken ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: routes.login, state: { from: props.location } }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;

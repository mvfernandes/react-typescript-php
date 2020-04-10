import React from "react";
import {
  Redirect,
  Route,
  RouteProps,
} from "react-router-dom";

interface IRouterProps extends RouteProps {
  isAuthenticated: boolean,
  component: any
}

const PrivateRoute = (props: IRouterProps) => {

  const { component: Component, isAuthenticated, ...rest } = props;

  return React.useMemo(() =>
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
            <Redirect to={{ pathname: "/", state: { from: props.location } }} />
          )
      }
    />
    // eslint-disable-next-line
    , [isAuthenticated]);

}
export default PrivateRoute;

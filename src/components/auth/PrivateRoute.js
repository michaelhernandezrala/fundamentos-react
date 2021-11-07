import { Redirect, Route } from "react-router";
import { useContext } from "react";
import AuthContext from "./context";
import { useAuth } from "./context";

const PrivateRoute = (props) => {
  const { isLogged } = useAuth();
  return isLogged ? (
    <Route {...props} />
  ) : (
    <Route>
      {({ location }) => (
        <Redirect to={{ pathname: "/login", state: { from: location } }} />
      )}
    </Route>
  );
};

export default PrivateRoute;

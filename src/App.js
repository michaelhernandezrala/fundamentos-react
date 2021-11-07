import "./App.css";
import Adverts from "./components/Advertisments/Adverts/Adverts";
import { useState } from "react";
import Login from './components/auth/Login/Login';
import { logout } from "./components/auth/Login/service";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { AuthContextProvider } from "./components/auth/context";
import Advert from "./components/Advertisments/Advert/Advert";
import PrivateRoute from "./components/auth/PrivateRoute";
import AdvertDetail from "./components/Advertisments/AdvertDetail/AdvertDetail";
import NewAdvertPage from "./components/Advertisments/NewAdvertPage/NewAdvertPage"
import ErrorPage from "./components/errorPage/ErrorPage";

function App({ isInitiallyLogged }) {
  const [isLogged, setIsLogged] = useState(isInitiallyLogged);

  const handleLogin = () => {
    setIsLogged(true);
  };

  const handleLogout = () => {
    logout().then(() => {
      setIsLogged(false);
    });
  };

  return (
    <Router>
      <AuthContextProvider value={{ isLogged, handleLogout, handleLogin }}>
        <div className="App">
          <Switch>
            <Route path="/login">
              {(routeProps) => <Login {...routeProps} />}
            </Route>
            <PrivateRoute path="/adverts/new">
              <NewAdvertPage />
            </PrivateRoute>
            <Route path="/adverts/:advertId">
              {(routeProps) => <AdvertDetail {...routeProps} />}
            </Route>
            <Route path="/adverts" component={Adverts} />
            <Route exact path="/">
              <Redirect to="/adverts" />
            </Route>
            <Route path="/404">
              {() => <ErrorPage/>}
            </Route>
            <Route>
              <Redirect to="/404" />
            </Route>
          </Switch>
        </div>
      </AuthContextProvider>
    </Router>
  );
}

export default App;

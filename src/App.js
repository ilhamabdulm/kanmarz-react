import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import './App.css';

import { selectLoginStatus } from './redux/user/user.selectors';
import { checkLoginStatus } from './redux/user/user.actions';

import LandingPage from './pages/LandingPage/LandingPage';
import AuthPage from './pages/AuthPage/AuthPage';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import BoardPage from './pages/BoardPage/BoardPage';

function App({ location }) {
  const loginStatus = useSelector(selectLoginStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(checkLoginStatus());
    }
    return;
  }, []);

  return (
    <div className="App">
      <Switch>
        <Route exact path="/auth" component={AuthPage} />
        <Route
          exact
          path="/dashboard"
          render={(props) =>
            loginStatus ? <DashboardPage {...props} /> : <Redirect to="/" />
          }
        />
        <Route
          exact
          path="/board"
          render={(props) =>
            loginStatus ? <BoardPage {...props} /> : <Redirect to="/" />
          }
        />
        <Route
          exact
          path="/"
          render={(props) =>
            loginStatus ? <Redirect to="/dashboard" /> : <LandingPage />
          }
        />
      </Switch>
    </div>
  );
}

export default App;

import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import ReferencePage from '../ReferencePage/ReferencePage';
import DetailsPage from '../DetailsPage/DetailsPage';
import CalculatorPage from '../CalculatorPage/CalculatorPage';
import ProfilePage from '../ProfilePage/ProfilePage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import SummaryPage from '../SummaryPage/SummaryPage';

import './App.css';

function App() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/calculator" />

          {/* Visiting localhost:3000/reference will show the about page. */}
          <Route
            // shows ReferencePage at all times (logged in or not)
            exact
            path="/reference"
          >
            <ReferencePage />
          </Route>

          <ProtectedRoute
            exact
            path="/details"
          >
            <DetailsPage />
          </ProtectedRoute>

          <ProtectedRoute
            exact
            path="/summary"
          >
            <SummaryPage />
          </ProtectedRoute>

          <Route
            // shows ReferencePage at all times (logged in or not)
            exact
            path="/calculator"
          >
            <CalculatorPage />
          </Route>

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/profile will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/profile */}
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/profile"
          >
            <ProfilePage />
          </ProtectedRoute>

          <Route
            exact
            path="/login"
          >
            {user.uuid ?
              // If the user is already logged in, 
              // redirect to the /calculator page
              <Redirect to="/calculator" />
              :
              // Otherwise, show the login page
              <LoginPage />
            }
          </Route>

          <Route
            exact
            path="/registration"
          >
            {user.uuid ?
              // If the user is already logged in, 
              // redirect them to the /calculator page
              <Redirect to="/calculator" />
              :
              // Otherwise, show the registration page
              <RegisterPage />
            }
          </Route>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

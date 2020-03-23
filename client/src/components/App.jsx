import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Navbar from './Navbar';
import Dogs from './Dogs/Dogs';
import LoginPage from './Users/LoginPage';
import RegistrationPage from './Users/RegistrationPage';

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Dogs} />
        <Route path="/login" render={(props) => <LoginPage history={props.history} />} />
        <Route path="/register" render={(props) => <RegistrationPage history={props.history} />} />
      </Switch>
    </Router>
  );
}

export default App;
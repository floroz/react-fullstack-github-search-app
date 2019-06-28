import React from 'react';
import { Switch, Route } from 'react-router-dom';
import GithubState from './components/context/github/GithubState';
import AlertState from './components/context/alert/AlertState';
import './App.css';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import User from './components/users/User';

const App = props => {
  return (
    <GithubState>
      <AlertState>
        <div className="App">
          <Navbar />
          <div className="container">
            <Alert />
            <Switch>
              <Route
                path="/"
                exact
                render={props => (
                  <>
                    <Search />
                    <Users />
                  </>
                )}
              />
              <Route path="/about" exact component={About} />
              <Route path="/user/:login" exact component={User} />
            </Switch>
          </div>
        </div>
      </AlertState>
    </GithubState>
  );
};

export default App;

import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Configs from './pages/Configs';

// start
export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/configs" component={ Configs } />
      </Switch>
    </div>
  );
}

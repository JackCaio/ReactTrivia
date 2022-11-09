import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Configs from './pages/Configs';
import Game from './pages/Game';

// start
export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/configs" component={ Configs } />
        <Route path="/game" component={ Game } />
      </Switch>
    </div>
  );
}

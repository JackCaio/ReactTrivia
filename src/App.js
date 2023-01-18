import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Configs from './pages/Configs';
import Game from './pages/Game';
import Ranking from './pages/Ranking';
import Feedback from './pages/Feedback';

const basePath = '/ReactTrivia';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path={ basePath } component={ Login } />
        <Route path={ `${basePath}/configs` } component={ Configs } />
        <Route path={ `${basePath}/game` } component={ Game } />
        <Route path={ `${basePath}/ranking` } component={ Ranking } />
        <Route path={ `${basePath}/feedback` } component={ Feedback } />
      </Switch>
    </div>
  );
}

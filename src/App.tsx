import React, {useEffect, useState} from 'react';
import {Route, Switch, useHistory} from 'react-router-dom';

import './App.css';
import {Authenticated} from "./pages/authenticated/Authenticated";
import {Authentication} from './pages/authentication/Authentication';
import {isTokenExpired} from './util/jwt.util';
import {containsAccessToken} from './util/local-storage.util';

interface Props {
}

export const App: React.FC<Props> = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!isTokenExpired());

  const history = useHistory();

  useEffect(() => {
    const localStorageUpdated = () => {
      console.log(containsAccessToken())
      setIsAuthenticated(containsAccessToken());
    }
    window.addEventListener('storage', localStorageUpdated);
    return () => {
      window.removeEventListener('storage', localStorageUpdated);
    }
  });

  if (isAuthenticated && history.location.pathname !== '/') {
    console.log('/');
    history.replace('/');
  } else if (!isAuthenticated && history.location.pathname !== '/login') {
    console.log('/login');
    history.replace('/login');
  }

  return (
    <div className="app-container">
      <Switch>
        <Route exact path={'/'} component={Authenticated}/>
        <Route exact path={'/login'} component={Authentication}/>
      </Switch>
    </div>
  );
}

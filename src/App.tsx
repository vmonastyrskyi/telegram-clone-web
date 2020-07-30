import React, {useEffect, useState} from 'react';
import {Route, Switch, useHistory} from 'react-router-dom';

import './App.css';
import {Authentication} from './pages/auth/Authentication';
import {isTokenExpired} from './util/jwt.util';
import {containsAccessToken} from './util/local-storage.util';

interface Props {
}

export const App: React.FC<Props> = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!isTokenExpired());

  const history = useHistory();

  useEffect(() => {
    const localStorageUpdated = () => {
      setIsAuthenticated(containsAccessToken());
    }

    window.addEventListener('storage', localStorageUpdated);
    return () => {
      window.removeEventListener('storage', localStorageUpdated);
    }
  });

  useEffect(() => {
    if (!isAuthenticated) {
      console.log('/login');
      history.replace('/login');
    } else {
      console.log('/');
      history.replace('/');
    }
  });

  return (
    <div className="app_container">
      <Switch>
        <Route exact path={'/login'} component={Authentication}/>
      </Switch>
    </div>
  );
}

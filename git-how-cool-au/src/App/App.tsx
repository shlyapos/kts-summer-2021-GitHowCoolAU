import RepoSearchRoute from 'config/routes/RepoSearchRoute';
import { useQueryParamsStoreInit } from 'store/RootStore/hooks/UseQueryParamsStoreInit';
import { Switch, Redirect } from 'react-router-dom';

import RepoSearchPage from './pages/RepoSearchPage';
import React from 'react';


const App = () => {
  useQueryParamsStoreInit();
  
  return (
    <div className="App">
      <Switch>
        <RepoSearchRoute path={'/repos/:owner?/:name?'}><RepoSearchPage /></RepoSearchRoute>
        <Redirect to='/repos' />
      </Switch>
    </div>
  );
}

export default App;
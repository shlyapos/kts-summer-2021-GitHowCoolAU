import './App.css';

import RepoSearchRoute from '@config/routes/RepoSearchRoute';
import { BrowserRouter, Switch, Redirect } from 'react-router-dom';

import RepoSearchPage from './pages/RepoSearchPage';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <RepoSearchRoute path={'/repos/:owner?/:name?'}><RepoSearchPage /></RepoSearchRoute>
          <Redirect to='/repos' />
        </Switch>
      </ BrowserRouter>
    </div>
  );
}

export default App;
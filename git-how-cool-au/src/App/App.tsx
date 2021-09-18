import './App.css';

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import RepoSearchPage from './pages/RepoSearchPage';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path='/repos/:owner/:name' component={RepoSearchPage} />
          <Route path='/repos' component={RepoSearchPage} />

          <Redirect to='/repos' />
        </Switch>
      </ BrowserRouter>
    </div>
  );
}

export default App;
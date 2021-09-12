import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import styles from './App.module.scss';
import RepoSearchPage from './pages/RepoSearchPage';
import RepoBranchesDrawer from './pages/RepoSearchPage';

function App() {
  return (
    <div className={`${styles.App}`}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/repos" component={RepoSearchPage} />
          <Route path="/repos/:owner/:name" component={RepoSearchPage} />

          <Redirect to="/repos" />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import Find from './pages/Find';

function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Landing} />
        <Route path='/find' component={Find} />
      </Switch>
    </Router>
  );
}

export default Routes;

import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Landing from './pages/Landing';
import Find from './pages/Find';
import Register from './pages/Register';
import Restaurant from './pages/Restaurant';

function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Landing} />
        <Route path='/find' component={Find} />
        <Route path='/register' component={Register} />
        <Route path='/restaurants/:id' component={Restaurant} />
      </Switch>
    </Router>
  );
}

export default Routes;

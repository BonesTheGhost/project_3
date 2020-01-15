import React from 'react';
//When importing we can use 'as' to import a component under an alias to make our lives easier. 'Router' helps with our routes, 'Route' is the JSX component we need for specific routes, and 'Redirect' is for enforcing which routes user has access to.
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import Users from './user/pages/Users';


//<Route> is a JSX component that we can use when importing 'react-router-dom'. It allows for a 'path' argument, and then whatever needs to be displayed is between the opening and closing tags.
const App = () => {
  //We wrap 'Router' around everything that should be able to use our router. Ex: pages.
  return <Router>
    <Route path="/" exact={true}>
      <Users />
    </Route>
    <Redirect to='/' />
  </Router>;
}

export default App;

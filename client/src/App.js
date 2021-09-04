import './App.css';
import React from 'react';
import IDE from './ide/ide';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import Home from './components/home';


function App() {
  return(
    <BrowserRouter>

      <Switch>
        <Route exact path="/">
          <Home/>
        </Route>
        <Route path="/ide">
          <IDE/>
        </Route>
        <Route path="*">
          <Redirect to path="/"/>
        </Route>
      </Switch>
    
    </BrowserRouter>
  );
}

export default App;

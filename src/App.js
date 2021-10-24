import React from 'react'
import Signup from './components/Signup'
import Login from './components/Login'
import AppHeader from './components/AppHeader'
import Eventlite from './components/Eventlite'
import Event from './components/Event'
import EventForm from './components/EventForm'
import {Router, Route, Redirect, Switch} from 'react-router-dom'
import history from './history'
import NotFound from './NotFound'

function App() {
  const currentUser = localStorage.getItem('user')
  return (<Router history={history}>
    <Route path="/">
      <AppHeader/>
    </Route>
    <Switch>
      <Route exact="exact" path="/">
        <Eventlite/>
      </Route>
      <Route exact="exact" path="/create" render={routeProps => (
          currentUser
          ? <EventForm {...routeProps}/>
          : <Redirect to='/login'/>)}/>
      <Route exact="exact" path="/events/:id" render={routeProps => (<Event {...routeProps}/>)}/>
      <Route exact="exact" path="/events/:id/edit" render={routeProps => (
          currentUser && toBoolean(localStorage.getItem('currentUserCanEdit'))
          ? <EventForm {...routeProps}/>
          : <Redirect to='/login'/>)}/>
      <Route exact="exact" path="/login">
        {
          currentUser
            ? <Redirect to="/"/>
            : <Login/>
        }
      </Route>
      <Route exact="exact" path="/signup">
        {
          currentUser
            ? <Redirect to="/"/>
            : <Signup/>
        }
      </Route>
      <Route component={NotFound}/>
    </Switch>
  </Router>)
}

export default App;


function toBoolean(str) {
    if (typeof str === 'undefined' || str === null) {
        return false;
    } else if (typeof str === 'string') {
        switch (str.toLowerCase()) {
        case 'false':
        case 'no':
        case '0':
        case "":
            return false;
        default:
            return true;
        }
    } else if (typeof str === 'number') {
        return str !== 0
    }
    else {return true;}
}

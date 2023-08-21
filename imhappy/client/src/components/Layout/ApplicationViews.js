import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { UserProfileContext } from '../UserProfile/UserProfileProvider';
import Login from '../UserProfile/Login';
import Register from '../UserProfile/Register';
import MomentList from '../Moment/MomentList';
import MomentForm from '../Moment/MomentForm';

const ApplicationViews = () => {
  const { isLoggedIn } = useContext(UserProfileContext);

  return (
    <Switch>
      <Route exact path='/'>
        {isLoggedIn ? <MomentList /> : <Redirect to='/login' />}
      </Route>

      <Route exact path='/moments'>
        {isLoggedIn ? <MomentList /> : <Redirect to='/login' />}
      </Route>

      <Route exact path='/moments/new'>
        {isLoggedIn ? <MomentForm /> : <Redirect to='/login' />}
      </Route>

      <Route exact path='/moments/edit/:momentId(\d+)'>
        {isLoggedIn ? <MomentForm /> : <Redirect to='/login' />}
      </Route>

      <Route path='/login'>
        <Login />
      </Route>

      <Route path='/register'>
        <Register />
      </Route>
    </Switch>
  );
};

export default ApplicationViews;

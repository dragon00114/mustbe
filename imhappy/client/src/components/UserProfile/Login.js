import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UserProfileContext } from '../UserProfile/UserProfileProvider';
import classes from '../shared/formStyle.module.css';

const Login = () => {
  const history = useHistory();
  const { login } = useContext(UserProfileContext);

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleLogin = (e) => {
    e.preventDefault();
    login(email, password)
      .then(() => history.push('/'))
      .catch(() => alert('Invalid email or password'));
  };

  return (
    <div className={classes['form-control']}>
      <form onSubmit={handleLogin}>
        <label htmlFor='email'>Email</label>
        <input
          id='email'
          type='text'
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor='password'>Password</label>
        <input
          id='password'
          type='password'
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type='submit'>Login</button>
      </form>
    </div>
  );
};

export default Login;

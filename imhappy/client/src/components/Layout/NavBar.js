import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import classes from './NavBar.module.css';
import { UserProfileContext } from '../UserProfile/UserProfileProvider';

const NavBar = () => {
  const { isLoggedIn, logout } = useContext(UserProfileContext);
  const history = useHistory();

  const handleLogout = () => {
    logout().then(() => history.push('/'));
  };

  return (
    <header className={classes.header}>
      <Link className={classes.logo} to='/'>
        IMHAPPY
      </Link>
      <nav className={classes.nav}>
        <ul>
          <li>
            {isLoggedIn ? (
              <Link to='/moments/new'>What made you happy today?</Link>
            ) : (
              <Link to='/register'>Register</Link>
            )}
          </li>
          <li>
            {isLoggedIn ? (
              <span onClick={handleLogout}>Log out</span>
            ) : (
              <Link to='/login'>Log in</Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;

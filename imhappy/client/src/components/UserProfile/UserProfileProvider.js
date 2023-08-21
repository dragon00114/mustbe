import React, { useState, useEffect, createContext } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

const apiUrl = '/api/userprofile';

export const UserProfileContext = createContext();

export const UserProfileProvider = (props) => {
  const userProfile = sessionStorage.getItem('userProfile');

  const [isLoggedIn, setIsLoggedIn] = useState(userProfile != null);
  const [isFirebaseReady, setIsFirebaseReady] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((u) => {
      setIsFirebaseReady(true);
    });
  }, []);

  const login = (email, pw) => {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, pw)
      .then((signInResponse) => getUserProfile(signInResponse.user.uid))
      .then((userProfile) => {
        sessionStorage.setItem('userProfile', JSON.stringify(userProfile));
        setIsLoggedIn(true);
      });
  };

  const logout = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        sessionStorage.clear();
        setIsLoggedIn(false);
      });
  };

  const register = async (userProfile, password) => {
    const response = await firebase
      .auth()
      .createUserWithEmailAndPassword(userProfile.email, password);
    const savedUserProfile = await saveUser({
      ...userProfile,
      firebaseUserId: response.user.uid,
    });

    sessionStorage.setItem('userProfile', JSON.stringify(savedUserProfile));
    setIsLoggedIn(true);

    return savedUserProfile;
  };

  const getToken = () => firebase.auth().currentUser.getIdToken();

  const getUserProfile = (firebaseUserId) => {
    return getToken().then((token) =>
      fetch(`${apiUrl}/${firebaseUserId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((resp) => resp.json())
    );
  };

  const saveUser = (userProfile) => {
    return getToken().then((token) =>
      fetch(apiUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userProfile),
      }).then((resp) => resp.json())
    );
  };

  return (
    <UserProfileContext.Provider
      value={{ isLoggedIn, login, logout, register, getToken }}
    >
      {isFirebaseReady ? props.children : 'Loading...'}
    </UserProfileContext.Provider>
  );
};

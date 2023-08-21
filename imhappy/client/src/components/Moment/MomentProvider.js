import React, { useState, createContext, useContext } from 'react';
import { UserProfileContext } from '../UserProfile/UserProfileProvider';

const apiUrl = '/api/moment';

export const MomentContext = createContext();

export const MomentProvider = (props) => {
  const { getToken } = useContext(UserProfileContext);

  const [moments, setMoments] = useState([]);

  const getAllMoments = async () => {
    const token = await getToken();
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Fetching moments failed');
    }

    const data = await response.json();
    setMoments(data);
    return data;
  };

  const getMoment = async (id) => {
    const token = await getToken();
    const response = await fetch(`${apiUrl}/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Fetching moment failed');
    }

    const data = await response.json();
    return data;
  };

  const addMoment = async (moment) => {
    const token = await getToken();
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(moment),
    });

    if (!response.ok) {
      throw new Error('Adding moment failed');
    }

    const data = await response.json();
    return data;
  };

  const updateMoment = async (moment) => {
    const token = await getToken();
    const response = await fetch(`${apiUrl}/${moment.id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(moment),
    });

    if (!response.ok) {
      throw new Error('Updating moment failed');
    }
  };

  const deleteMoment = async (id) => {
    const token = await getToken();
    const response = await fetch(`${apiUrl}/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Deleting moment failed');
    }

    getAllMoments();
  };

  return (
    <MomentContext.Provider
      value={{
        moments,
        getAllMoments,
        getMoment,
        addMoment,
        updateMoment,
        deleteMoment,
      }}
    >
      {props.children}
    </MomentContext.Provider>
  );
};

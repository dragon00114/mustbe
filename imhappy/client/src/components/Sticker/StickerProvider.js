import React, { useState, createContext, useContext } from 'react';
import { UserProfileContext } from '../UserProfile/UserProfileProvider';

const apiUrl = '/api/sticker';

export const StickerContext = createContext();

export const StickerProvider = (props) => {
  const { getToken } = useContext(UserProfileContext);

  const [stickers, setStickers] = useState([]);

  const getAllStickers = () => {
    return getToken().then((token) =>
      fetch(apiUrl, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((resp) => resp.json())
        .then(setStickers)
    );
  };

  return (
    <StickerContext.Provider value={{ stickers, getAllStickers }}>
      {props.children}
    </StickerContext.Provider>
  );
};

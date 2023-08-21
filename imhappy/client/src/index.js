import firebase from 'firebase/app';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import './index.css';
import App from './App';
import { StickerProvider } from './components/Sticker/StickerProvider';
import { MomentProvider } from './components/Moment/MomentProvider';
import { UserProfileProvider } from './components/UserProfile/UserProfileProvider';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
};

firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <UserProfileProvider>
      <StickerProvider>
        <MomentProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </MomentProvider>
      </StickerProvider>
    </UserProfileProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

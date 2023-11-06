import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <>
    <GoogleOAuthProvider clientId="35173665291-tqsaugfjn3i4es5mcltbmtbluqlepnv3.apps.googleusercontent.com">
       <App />
       </GoogleOAuthProvider>

  </>
)
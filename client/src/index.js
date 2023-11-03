import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react';
import {GoogleOAuthProvider} from '@react-oauth/google'
import { reducers } from './redux/reducers';
import thunk from 'redux-thunk';
import {createStore,applyMiddleware,compose} from 'redux';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;
const store = createStore(reducers, {}, composeEnhancers(applyMiddleware(thunk)))

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <>
    
      
      <GoogleOAuthProvider
                clientId="35173665291-tqsaugfjn3i4es5mcltbmtbluqlepnv3.apps.googleusercontent.com">
       <App />
       </GoogleOAuthProvider>

  </>
)
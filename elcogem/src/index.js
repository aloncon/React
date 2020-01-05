import React from 'react';
import ReactDOM from 'react-dom';
//import {BrowserRouter as Router} from 'react-router-dom';
import {HashRouter as Router} from 'react-router-dom';

import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
//import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas/index';
import navReducer from './Store/reducer/navigation';
import tradeReducer from './Store/reducer/tradeShows';
import instagramReducer from './Store/reducer/instagram';

import './index.css';
import './css/fonts.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const rootReducer = combineReducers({
    trade       : tradeReducer,
    nav         : navReducer,
    instagram   : instagramReducer
   });

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    rootReducer, 
    applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

const app = (
<Provider store={store}>
    <Router basename="/"
            hashType="noslash">
        <App />
    </Router>
</Provider>

);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

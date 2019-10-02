import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import axios from 'axios';
import registerServiceWorker from './registerServiceWorker';

axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com/';
axios.interceptors.request.use((request)=>{
    console.log(request);
    return request;
}, error=>{
    console.log('error: axios.interceptors.request',error);
    return Promise.reject(error);
})
axios.interceptors.response.use((response)=>{
    console.log(response);
    return response;
}, error=>{
    console.log('error: axios.interceptors.request',error);
    return Promise.reject(error);
})

ReactDOM.render( <App />, document.getElementById( 'root' ) );
registerServiceWorker();

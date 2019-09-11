import React from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';
//import Express from 'express';
//const app = Express();
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

let USER_ID = '5d743aeed2426d3761d0016e';
let AUTH_TOKEN;

Axios.defaults.baseURL = 'http://localhost:3000/api';
//Axios.defaults.headers.common['auth-token'] = AUTH_TOKEN;

/*Axios.post('/user/register', {
    name: 'Finn Mitchell',
    email: 'finnilinn@gmail.com',
    password: 'finster123'
}).then(res => {
    USER_ID = res.data.user;
    return Axios.post('/user/login', {
        email: 'finnilinn@gmail.com',
        password: 'finster123'
    });
}).then(res => {
    AUTH_TOKEN = res.data;
}).catch(err => {
    console.log(err);
});*/

Axios.post('/user/login', {
    email: 'andymitch559@gmail.com',
    password: 'Atticus559!'
}).then(res => {
    AUTH_TOKEN = res.data;
}).catch(err => {
    console.log(err);
});

setTimeout(() => {
    const message = {
        user_id: USER_ID,
        number: 0
    };

    Axios.defaults.headers.common['auth-token'] = AUTH_TOKEN;
    Axios.get('/messages', {params: message})
    .then(res => {console.log(res);})
    .catch(err => {
        console.log('OH NO!');
        console.log(err);
    });
}, 3000)

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

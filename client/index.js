import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Center from './components/center/centerPanel';
import Right from './components/right/rightPanel';
import Search from './components/Search';

const list = [
    {picture: '../assets/andymitch559.jpg', name: 'Adam Mitchell', handle: 'adammitch559'},
    {picture: '../assets/andymitch559.jpg', name: 'Frank Mitchell', handle: 'frankmitch559'},
    {picture: '../assets/andymitch559.jpg', name: 'Michael Mitchell', handle: 'michaelmitch559'},
    {picture: '../assets/andymitch559.jpg', name: 'John Mitchell', handle: 'johnmitch559'},
    {picture: '../assets/andymitch559.jpg', name: 'Gary Mitchell', handle: 'garymitch559'},
    {picture: '../assets/andymitch559.jpg', name: 'Ewan Mitchell', handle: 'ewanmitch559'},
    {picture: '../assets/andymitch559.jpg', name: 'Levi Mitchell', handle: 'levimitch559'}
];

export const user = 'andymitch559';

//if not in production environment, access localhost else access production url
export const BASE_URL = process.env.NODE_ENV !== 'production' ? 'http://localhost:3000' : 'https://dopplr-server.andymitch559.now.sh'

ReactDOM.render(<App/>, document.getElementById('root'));
ReactDOM.render(<Center/>, document.getElementById('center-content'));
ReactDOM.render(<Right/>, document.getElementById('right-content'));
ReactDOM.render(<Search users={list}/>, document.getElementById('top-right'));

//to work offline and load faster change unregister() to register(): https://bit.ly/CRA-PWA
serviceWorker.unregister();

import React from 'react';
import { browserhistory, BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Home from './Home';
import Profile from './Profile';
import Messages from './Messages';
import Friends from './Friends';
import Notifications from './Notifications';
import Settings from './Settings';
import '../styles/Center.css';


export default class Center extends React.Component{
    constructor(props){
        super(props);
        //
    }
    //
    render(){
        //
        return(
            <div>
                <Router>
                    <Route exact path={'/'} component={Home}></Route>
                    <Route path={'/profile'} component={Profile}></Route>
                    <Route path={'/friends'} component={Friends}></Route>
                    <Route path={'/messages'} component={Messages}></Route>
                    <Route path={'/notifications'} component={Notifications}></Route>
                    <Route path={'/settings'} component={Settings}></Route>
                </Router>
            </div>
        );
    }
};
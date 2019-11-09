import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Messages from './Messages';
import Friends from './Friends';
import Home from './Home';
import '../styles/Right.css';

export default class Right extends React.Component{
    constructor(props){
        super(props);
        //
    }
    //<Route path={'/messages'} render={(props) => <Messages {...props} onShowMsg={true} />}/>
    render(){
        //
        return(
            <div id="rightPanel">
                <Router>
                    <Route exact path={'/'} component={Home}></Route>
                    <Route path={'/messages'} component={Messages}></Route>
                    <Route path={'/friends'} component={Friends}></Route>
                </Router>
            </div>
        );
    }
}
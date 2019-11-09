import React from 'react';
import Axios from 'axios';
import Img from 'react-image';
//import UserImg from 'react-user-avatar';
import { BASE_URL } from '../index';
import './styles/Search.css';

export class Results extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        let _users = [];
        if(this.props.count > this.props.users.length) _users = this.props.users;
        else for(let i = 0; i < this.props.count; i++) _users.push(this.props.users[i]);
        return(
            <div id="inner-search">
                {_users.map(user => (
                    <div id="result">
                        <Img size="40" name={user.name} src={`${BASE_URL}/avatar?user=${user.handle}`}/>
                        <h1>{user.name}</h1>
                        <p>{user.handle}</p>
                    </div>
                ))}
            </div>
        );
    }
}

export default class Search extends React.Component{
    constructor(props){
        super(props);
    }
    state = {
        count: 0
    }

    handleSearch = (event) => {
        const len = event.target.value.length;
        this.setState({
            count: len
        });
    }

    clear = () => {
        document.getElementById("_input").value = '';
        this.setState({
            count: 0
        });
    }

    render(){
        //dynamically pull array of max 5 users
        return(
            //container for list
            <div>
                <div id="search">
                    <i className="fas fa-search" id="mag"></i>
                    <input id="_input" type="text" placeholder="Search.." onChange={this.handleSearch} onBlur={this.clear}></input>
                </div>
                <div id="search-results-container">
                    <ul className="search-results"><Results count={this.state.count} users={this.props.users}/></ul>
                </div>
            </div>
        );
    }
}
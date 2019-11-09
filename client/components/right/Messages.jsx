import React, {useState} from 'react';
import { BASE_URL, user } from '../../index';
import '../styles/Right.css';


export default class Messages extends React.Component{
    /*constructor(props){
        super(props);
        //const res = fetch(`${BASE_URL}/messages/?user=${user}`);
        const res = fetch(`${BASE_URL}/messages`);
        console.log(res.data);
        this.messages = res;
    }*/

    /*selectMsg = (index) => {
        this.props.onShowMsg({index}); 
    }*/

    render(){
        /*return(
            <div>
                <h1>messages</h1>
                {this.messages.map(message => (
                    <div onclick={this.selectMsg(message.group[0].name)} style={{display: 'flex', marginTop: '.5em', justifyContent: 'space-between', alignItems: 'center'}}>
                        <img style={{borderRadius: '50%', height: '100%'}} src={message.group[0].picture} alt={message.group[0].name}/>
                        <div>
                            {message.group.map(user =>(<h3>user.name</h3>))}
                            <p>{message.messages[message.messages.length-1].substr(0, 31)}</p>
                        </div>
                    </div>
                ))}
            </div>
        );*/
        return(
            <h2>{user}'s message list</h2>
        );
    }
}
import '../styles/Center.css';
import React from 'react';
import Img from 'react-image';
import pic from '../../assets/andymitch559.jpg';


export class GetFriends extends React.Component{
    constructor(props){
        super(props);
    }
    //
    render(){
        let friends = [{name: 'Peter Smith', handle: 'petey_123', picture: pic},
        {name: 'Peter Smith', handle: 'petey_123', picture: pic},
        {name: 'Peter Smith', handle: 'petey_123', picture: pic},
        {name: 'Peter Smith', handle: 'petey_123', picture: pic},
        {name: 'Peter Smith', handle: 'petey_123', picture: pic},
        {name: 'Peter Smith', handle: 'petey_123', picture: pic},];
        return(
            <div>
                {friends.map(friend => (
                    <div className="friend-link-c">
                        <Img className="profilePic" size="40" name={friend.name} src={friend.picture}/>
                        <p>{friend.handle}</p>
                        <br></br>
                        <h1>{friend.name}</h1>
                    </div>
                ))}
            </div>
        );
    }
}

export default class Friends extends React.Component{
    constructor(props){
        super(props);
        //
    }
    render(){
        return (<div id="friends-container-c"><GetFriends/></div>);
    }
}

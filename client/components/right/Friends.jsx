import React from 'react';
import { BASE_URL, user } from '../../index';
import '../styles/Right.css';
import Img from 'react-image';
import pic from '../../assets/andymitch559.jpg';
import '../styles/Right.css';

export class Suggests extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        let suggests = [{name: 'Michael Smith', handle: 'mikey_123', picture: pic},
        {name: 'Michael Smith', handle: 'mikey_123', picture: pic},
        {name: 'Michael Smith', handle: 'mikey_123', picture: pic},
        {name: 'Michael Smith', handle: 'mikey_123', picture: pic},
        {name: 'Michael Smith', handle: 'mikey_123', picture: pic},
        {name: 'Michael Smith', handle: 'mikey_123', picture: pic},];
        return(
            <div>
                {suggests.map(suggest => (
                    <div id="friend-link-r">
                        <Img className="profilePic" size="40" name={suggest.name} src={suggest.picture}/>
                        <p>{suggest.handle}</p>
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
    //
    render(){
        //
        return(
            <div>
                Suggested Friends
                <span id="suggests-container">
                    <Suggests/>
                </span>
            </div>
        );
    }
}

/*
function Friends(){
    const [friends, setFriends] = React.useState([]);
    const [suggests, setSuggests] = React.useState([]);

    async function getFriends(){
        //const res = await fetch(`${BASE_URL}/friends/?user=${user}`);
        const res = await fetch(`${BASE_URL}/friends`);
        const resData = await res.json();
        setFriends(resData.data);
    }
    async function getSuggestions(){
        //const res = await fetch(`${BASE_URL}/suggests/?user=${user}`);
        const res = await fetch(`${BASE_URL}/suggests`);
        const resData = await res.json();
        setSuggests(resData.data);
    }
    getFriends();
    getSuggestions();
    return (
        <div>
            <div id='friends'>
                <h1>Friends</h1>
                {friends.map(friend => (
                    <div key={friend.handle} style={{width: '100%', display: 'flex', marginTop: '.5em', justifyContent: 'space-between', alignItems: 'center'}}>
                        <img style={{borderRadius: '50%', height: '100%'}} src={friend.picture} alt={friend.name}/>
                        <div>
                            <h3>{friend.handle}</h3>
                            <p>{friend.name}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div id='suggests'>
                <h1>Suggested Friends</h1>
                {suggests.map(suggest => (
                    <div key={suggest.handle} style={{width: '100%', display: 'flex', marginTop: '.5em', justifyContent: 'space-between', alignItems: 'center'}}>
                        <img style={{borderRadius: '50%', height: '100%'}} src={suggest.picture} alt={suggest.name}/>
                        <div>
                            <h3>{suggest.handle}</h3>
                            <p>{suggest.name}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
    return(
        <div>
            <h2>suggested friends</h2>
        </div>
    );
}

export default Friends;
*/
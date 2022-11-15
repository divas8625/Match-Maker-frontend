import React, { useEffect , useContext , useState } from 'react'
import { UserContext } from '../../context/Context'
import { allMessages } from '../../service/api';
import Singlemssg from './Singlemssg';
import ScrollableFeed from 'react-scrollable-feed'
import "./Matches.css"

const ChatComponent = ({messages}) => {
    const {userData} = useContext(UserContext);
    // console.log(messages ,"from messages");
    return (
        <>
            <ScrollableFeed style={{height: "5rem"}}>
            <div className='chat-class'>
            {
                messages && messages.map((elem)=>{return (<div className={elem.sender._id === userData._id ? "sender":"receiver"}>{elem.content}</div>)})
            }
            </div>
            </ScrollableFeed>
        </>  
    )
}

export default ChatComponent
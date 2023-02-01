import { v4 as uuidv4 } from 'uuid';
import React, { useState, useEffect } from 'react'


function Chat({ socket, username, room }) {

    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);


    const sendMessage = (e) => {

        if (currentMessage !== "") {

            const messageData = {
                room: room,
                author: username,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
                id: uuidv4(),
            };
            socket.emit("send_message", messageData);

            setMessageList((list) => [...list, messageData]);
            
        }
        e.preventDefault();
        setCurrentMessage('');
        console.log(setCurrentMessage);

    };


    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMessageList((list) => [...list, data]);
        });
        return () => {
            socket.off("receive_message");
        };
    }, [socket]);


    return (
        <div className='chat-window'>
            <div className='chat-header'>
                <p>Live Chat</p>
            </div>
            <div className='chat-body message-container chatlist'>
                <div>

                    {messageList.map((messageContent) => {
                        return <div className='message'
                            id={username === messageContent.author ? "you" : "other"}
                            key={uuidv4()}>
                            <div>
                                <div className='message-content'>
                                    <p>{messageContent.message}</p>
                                </div>
                                <div className='message-meta'>
                                    <p id='time'>{messageContent.time}</p>
                                    <p id='author'>{messageContent.author}</p>
                                </div>
                            </div>

                        </div>;
                    })}

                </div>

            </div>
            <form onSubmit={sendMessage}>

                <div className='chat-footer'>
                    <input
                    value={currentMessage}
                        placeholder='Type Message'
                        onChange={(e) => {
                            setCurrentMessage(e.target.value);
                        }}

                    />
                    <button onClick={sendMessage}>&#9658;</button>
                </div>
            </form>
        </div>
    )
}

export default Chat
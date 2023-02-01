import { v4 as uuidv4 } from 'uuid';
import React, { useEffect, useState } from 'react'
import { useChat } from "../../context/Context";
import ChatForm from '../../SecondWay/ChatForm'
import "./styles.css";


function Container({socket, username, room}) {

  const [showChat, setShowChat] = useState(false);
  const { message, setMessages } = useChat();

  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);


  const sendMessage = async () => {

    if (currentMessage !== "") {

      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
        id: uuidv4(),
      };
      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
    }
  };

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };


  return (
    <div className="App">
      <div >
        
          <div className="app-container">
        

            <footer>
              <div className="chatlist">
                <div>
                  {message.map((item, key) => (
                    <div
                      key={key}
                      className="chatItem">
                      {item.message}
                    </div>))}
                </div>

              </div>

            </footer>
            <div className='chat-footer'>
                <input
                    placeholder='Type Message'
                    onChange={(event) => {
                        setCurrentMessage(event.target.value);
                    }}
                    onKeyDown={(event) => {
                        event.key === "Enter" && sendMessage();
                    }}
                />
                <button onClick={sendMessage}>&#9658;</button>
            </div>
          </div>
        
      </div>
    </div>
  )
}

export default Container
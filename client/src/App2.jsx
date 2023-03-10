import React, { useState } from 'react'
import io from "socket.io-client";
import { ChatProvider } from './components/context/Context'
import Container from './components/SecondWay/container/Container'

const socket = io.connect("http://localhost:3001");

function App2() {
    const [username, setUsername] = useState("");
    const [room, setRoom] = useState("");
    const [showChat, setShowChat] = useState(false);

    const joinRoom = () => {
        if (username !== "" && room !== "") {
            socket.emit("join_room", room);
            setShowChat(true);
        }
    };

    return (
        <div>
            {!showChat ? (
                <div className="joinChatContainer">
                    <h3>Join A Chat</h3>
                    <input
                        type="text"
                        placeholder="Username"
                        onChange={(event) => {
                            setUsername(event.target.value);
                        }}
                    />
                    <input
                        type="text"
                        placeholder="Room ID..."
                        onChange={(event) => {
                            setRoom(event.target.value);
                        }}

                    />
                    <button onClick={joinRoom}>Join A Room</button>

                </div>
            )
                :

                <ChatProvider>
                    <Container />
                </ChatProvider>
            }
        </div>
    )
}

export default App2
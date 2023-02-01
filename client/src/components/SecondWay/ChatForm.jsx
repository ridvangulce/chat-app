import React, { useState } from 'react'
import styles from "./styles.module.css"
function ChatForm({sendMessage}) {


  const [message, setMessages] = useState('');

  const handleSubmit = (e)=>{
    e.preventDefault();
    console.log(message)
    setMessages('');

  }
  


  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input className={styles.textInput} value={message} onChange={(e) => setMessages(e.target.value)} />
        <button onClick={handleSubmit}>&#9658;</button>
      </form>
    </div>
  )
}

export default ChatForm
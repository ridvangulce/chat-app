import { createContext, useState ,useContext} from 'react'

const ChatContext = createContext();


export const ChatProvider = ({ children }) => {

    const [message, setMessages] = useState([
        { message: 'selam' },
        { message: 'naber' },
        { message: 'selam' },
        { message: 'naber' },
        { message: 'selam' },
        { message: 'naber' },
        { message: 'selam' },
        { message: 'naber' },
        { message: 'selam' },
        { message: 'naber' },
        
    ]);
    const values = {
        message,
        setMessages,

    };
    return <ChatContext.Provider value={values}>{children}</ChatContext.Provider>
};

export const useChat = ()=>useContext(ChatContext)


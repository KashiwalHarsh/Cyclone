import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';

type ChatContextType = {
  user: userI | undefined;
  setUser: React.Dispatch<React.SetStateAction<userI | undefined>>;
  selectedChat: chatI | undefined;
  setSelectedChat: React.Dispatch<React.SetStateAction<chatI | undefined>>;
  chats: chatI[];
  setChats: React.Dispatch<React.SetStateAction<chatI[]>>;
};

const ChatContext = createContext<ChatContextType | null>(null);

interface userI {
  _id: string;
  name: string;
  email: string;
  pic: string;
  token: string;
}

interface chatI {
  _id: string;
  chatName: string;
  isGroupChat: boolean;
}
interface ChatProviderProps {
  children: ReactNode;
}

const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  //fix these useStates by typecheking
  const [user, setUser] = useState<userI | undefined>();
  const [selectedChat, setSelectedChat] = useState<chatI | undefined>();
  const [chats, setChats] = useState<chatI[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userString = localStorage.getItem('userInfo');
    //@ts-expect-error JSON.parse only accpets string but here it gets null
    const userInfo = JSON.parse(userString) as userI;
    setUser(userInfo);

    if (userString == null) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <ChatContext.Provider
      value={{ user, setUser, selectedChat, setSelectedChat, chats, setChats }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  const context = useContext(ChatContext);

  if (!context) {
    throw new Error('useChatState must be used within a ChatProvider');
  }
  return context;
};

export default ChatProvider;

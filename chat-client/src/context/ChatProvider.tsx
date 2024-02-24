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
  selectedChat: userI | undefined;
  setSelectedChat: React.Dispatch<React.SetStateAction<userI | undefined>>;
  chats: userI[];
  setChats: React.Dispatch<React.SetStateAction<userI[]>>;
};

const ChatContext = createContext<ChatContextType | null>(null);

interface userI {
  _id: string;
  name: string;
  email: string;
  pic: string;
  token: string;
}
interface ChatProviderProps {
  children: ReactNode;
}

const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  //fix these useStates by typecheking
  const [user, setUser] = useState<userI | undefined>();
  const [selectedChat, setSelectedChat] = useState<userI | undefined>();
  const [chats, setChats] = useState<userI[]>([]);
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

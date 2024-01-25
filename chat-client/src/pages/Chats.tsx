import { Box } from '@chakra-ui/react';
import { ChatState } from '../context/ChatProvider';
import SideDrawer from '../components/chats/SideDrawer';
import MyChats from '../components/chats/MyChats';
import ChatBox from '../components/chats/ChatBox';

const Chats: React.FC = () => {
  const { user } = ChatState();
  return (
    <div style={{ width: '100%' }}>
      <h1>Access to the website</h1>
      {user && <SideDrawer />}
      <Box>
        {user && <MyChats />}
        {user && <ChatBox />}
      </Box>
    </div>
  );
};

export default Chats;

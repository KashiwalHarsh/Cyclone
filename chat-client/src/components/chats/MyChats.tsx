import { useEffect, useState } from 'react';
import { ChatState } from '../../context/ChatProvider';
import { useToast } from '@chakra-ui/react';
import axios from 'axios';

const MyChats = () => {
  const [loggedUser, setLoggedUser] = useState();
  const { user, selectedChat, setSelectedChat, chats, setChats } = ChatState();
  const toast = useToast();
  //can cause problem
  if (!user) return;

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(
        'http://localhost:3000/api/chats',
        config
      );
      setChats(data);
    } catch (error) {
      toast({
        title: 'Error Occured',
        description: 'Failed to Load the Chats',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom-left',
      });
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem('userInfo')));
    fetchChats();
  }, []);
  return <>MyChats</>;
};

export default MyChats;

import { useEffect, useState } from 'react';
import { ChatState } from '../../context/ChatProvider';
import { Box, Button, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { AddIcon } from '@chakra-ui/icons';

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
      console.log(data);
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
  return (
    <Box
      display={{ base: selectedChat ? 'none' : 'flex', md: 'flex' }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="white"
      w={{ base: '100%', md: '31%' }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: '18px', md: '20px' }}
        fontFamily="Work sans"
        display="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        My Chats
        <Button
          display="flex"
          fontSize={{ base: '15px', md: '10px', lg: '15px' }}
          rightIcon={<AddIcon />}
        >
          New Group Chat
        </Button>
      </Box>
    </Box>
  );
};

export default MyChats;

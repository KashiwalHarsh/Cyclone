import { InfoIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { ChatState } from '../../context/ChatProvider';
import UserBadgeItem from './UserBadgeItem';
import axios from 'axios';
import UserListItem from './UserListItem';

const UpdateGroupChatModal = ({ fetchAgain, setFetchAgain }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupChatName, setGroupChatName] = useState();
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renameLoading, setRenameLoading] = useState(false);

  const toast = useToast();

  const { selectedChat, setSelectedChat, user } = ChatState();

  const handleAddUser = async (userToAdd) => {
    if (selectedChat.users.find((u) => u._id === userToAdd._id)) {
      toast({
        title: 'User already in group',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      return;
    }
    if (selectedChat.groupAdmin._id !== user._id) {
      toast({
        title: 'Only Admins can add someone!',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.put(
        `http://localhost:3000/api/chats/groupadd`,
        { chatId: selectedChat?._id, userId: userToAdd._id },
        config
      );
      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setLoading(false);
    } catch (err) {
      toast({
        title: 'Error Occured',
        description: err.response.data.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      setLoading(false);
    }
  };

  const handleRemove = async (userToRemove) => {
    if (
      selectedChat.groupAdmin._id !== user._id &&
      userToRemove._id !== user._id
    ) {
      toast({
        title: 'Only Admins can remove someone!',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.put(
        `http://localhost:3000/api/chats/groupremove`,
        { chatId: selectedChat?._id, userId: userToRemove._id },
        config
      );
      userToRemove._id === user._id ? setSelectedChat() : setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setLoading(false);
    } catch (err) {
      toast({
        title: 'Error Occured',
        description: err.response.data.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      setLoading(false);
    }
  };

  const handleRename = async () => {
    if (!groupChatName) return;
    try {
      setRenameLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        `http://localhost:3000/api/chats/rename`,
        {
          chatId: selectedChat._id,
          chatName: groupChatName,
        },
        config
      );
      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setRenameLoading(false);
    } catch (err) {
      toast({
        title: 'Something went wrong',
        description: 'Failed to rename the group',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom-left',
      });
      setRenameLoading(false);
    }
    setGroupChatName('');
  };
  const handleSearch = async (query: string) => {
    setSearch(query);
    if (!query) return;
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(
        `http://localhost:3000/api/user?search=${query}`,
        config
      );
      setSearchResult(data);
      setLoading(false);
    } catch (err) {
      toast({
        title: 'Error Occured',
        description: 'Failed to Load the search Results',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
    }
  };

  return (
    <>
      <InfoIcon display={{ base: 'flex' }} onClick={onOpen} />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize="25px"
            fontFamily="Work sans"
            display="flex"
            justifyContent="center"
          >
            {selectedChat?.chatName}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box width="100%" display="flex" flexWrap="wrap" pb={3}>
              {selectedChat?.users.map((e) => (
                <UserBadgeItem
                  key={e._id}
                  name={e.name}
                  handleFunction={() => handleRemove(e)}
                />
              ))}
            </Box>
            <FormControl display="flex">
              <Input
                placeholder="Chat Name"
                mb={3}
                value={groupChatName}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
              <Button
                variant="solid"
                colorScheme="teal"
                ml={1}
                isLoading={renameLoading}
                onClick={handleRename}
              >
                Update
              </Button>
            </FormControl>
            <FormControl>
              <Input
                placeholder="Add User to group"
                mb={1}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>
            {loading ? (
              <Spinner size="lg" />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => handleAddUser(user)}
                />
              ))
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={() => handleRemove(user)}>
              Leave Group
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateGroupChatModal;

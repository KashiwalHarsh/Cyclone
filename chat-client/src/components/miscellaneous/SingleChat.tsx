import { Box, IconButton, MenuItem, Text } from '@chakra-ui/react';
import { ChatState } from '../../context/ChatProvider';
import { ArrowBackIcon, InfoIcon } from '@chakra-ui/icons';
import { getSender, getSenderFull } from '../../config/chatLogic';
import ProfileModal from './ProfileModal';
import UpdateGroupChatModal from './UpdateGroupChatModal';

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { user, selectedChat, setSelectedChat } = ChatState();
  return (
    <>
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: '20px', md: '25px' }}
            pb={3}
            px={2}
            w="100%"
            fontFamily="Work sans"
            display="flex"
            justifyContent={{ base: 'space-between' }}
            alignItems="center"
          >
            <IconButton
              display={{ base: 'flex', md: 'none' }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat('')}
            />
            {!selectedChat.isGroupChat ? (
              <>
                {getSender(user, selectedChat.users)}
                <ProfileModal user={getSenderFull(user, selectedChat.users)}>
                  <InfoIcon />
                </ProfileModal>
              </>
            ) : (
              <>
                {selectedChat.chatName.toUpperCase()}
                <UpdateGroupChatModal
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                />
              </>
            )}
          </Text>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            p={3}
            bg="#e8e8e8"
            width="100%"
            height="100%"
            borderRadius="lg"
            overflowY="hidden"
          ></Box>
        </>
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          h="100%"
        >
          <Text fontSize="2xl" pb={2} fontFamily="Work sans" color="grey">
            Click on user to start chatting
          </Text>
        </Box>
      )}
    </>
  );
};

export default SingleChat;

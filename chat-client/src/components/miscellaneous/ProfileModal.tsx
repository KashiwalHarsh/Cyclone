import { ViewIcon } from '@chakra-ui/icons';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Button,
  useDisclosure,
  IconButton,
  Image,
  Text,
} from '@chakra-ui/react';
import { ReactNode } from 'react';

interface userI {
  _id: string;
  name: string;
  email: string;
  pic: string;
  token: string;
}
interface ProfileModalProps {
  user: userI;
  children: ReactNode;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ user, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton
          display={{ base: 'flex' }}
          icon={<ViewIcon />}
          aria-label="false"
        />
      )}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody
            marginTop="20px"
            color="gray"
            display="flex"
            flexDir="column"
            alignItems="center"
            justifyContent="center"
          >
            <Image
              borderRadius="full"
              boxSize="100px"
              src={user.pic}
              alt={user.name}
            />
            <Text fontSize="30px" display="flex" justifyContent="center">
              {user.name}
            </Text>
            <Text fontSize="20px">Email : {user.email}</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModal;

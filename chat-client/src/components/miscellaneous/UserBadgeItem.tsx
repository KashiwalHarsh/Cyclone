import { CloseIcon } from '@chakra-ui/icons';
import { Box } from '@chakra-ui/react';

const UserBadgeItem = ({ name, handleFunction }) => {
  return (
    <Box
      onClick={handleFunction}
      cursor="pointer"
      bg="#9b33cfe8"
      color="white"
      _hover={{ background: '#8b2db9e8' }}
      px={2}
      py={1}
      my={2}
      mr={1}
      display="flex"
      borderRadius="lg"
    >
      {name}
      <CloseIcon pl={2} pt={2} />
    </Box>
  );
};

export default UserBadgeItem;

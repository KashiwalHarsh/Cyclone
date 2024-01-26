import { Box, Button, Text, Tooltip } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const SideDrawer = () => {
  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth="5px"
      >
        <Tooltip
          label="   Search user for Chat"
          hasArrow
          placeContent="bottom-end"
        >
          <Button variant="ghost">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            <Text px="4">Search User</Text>
          </Button>
        </Tooltip>
      </Box>
    </>
  );
};

export default SideDrawer;

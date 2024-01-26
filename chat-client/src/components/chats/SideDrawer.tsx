import { Box, Button, Text, Tooltip } from '@chakra-ui/react';

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
          label="Search user for Chat"
          hasArrow
          placeContent="bottom-end"
        >
          <Button variant="ghost">
            <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" />
            <Text>Search User</Text>
          </Button>
        </Tooltip>
      </Box>
    </>
  );
};

export default SideDrawer;

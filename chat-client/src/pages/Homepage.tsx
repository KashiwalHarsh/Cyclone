import { Container, Box, Text } from '@chakra-ui/react';

const Homepage = () => {
  return (
    <>
      <Container maxW="xl" centerContent>
        <Box
          display="flex"
          justifyContent="center"
          p="3"
          bg="white"
          w="100%"
          m="40px 0 15px 0"
          borderRadius="lg"
          borderWidth="1px"
        >
          <Text> Chat App</Text>
        </Box>
        <Box></Box>
      </Container>
    </>
  );
};

export default Homepage;

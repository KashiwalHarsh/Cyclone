import {
  Container,
  Box,
  Text,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from '@chakra-ui/react';

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
          <Text fontSize="xl" fontFamily="Work sans" color="black">
            Chat App
          </Text>
        </Box>
        <Box
          bg="white"
          w="100%"
          p="4"
          borderRadius="lg"
          borderWidth="1px"
          color="black"
        >
          <Tabs variant="unstyled" width="100%">
            <TabList mb="1em">
              <Tab width="50%" _selected={{ color: 'white', bg: 'blue.500' }}>
                Login
              </Tab>
              <Tab width="50%" _selected={{ color: 'white', bg: 'green.400' }}>
                Signup
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <p>Login Fields</p>
              </TabPanel>
              <TabPanel>
                <p>Signup Fields</p>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Container>
    </>
  );
};

export default Homepage;

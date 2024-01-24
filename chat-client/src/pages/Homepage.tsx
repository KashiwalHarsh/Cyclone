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
import Login from '../components/authentication/Login';
import Signup from '../components/authentication/Signup';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Homepage = () => {
  const navigate = useNavigate();

  interface userInfoI {
    _id: string;
    name: string;
    email: string;
    pic: string;
    token: string;
  }

  useEffect(() => {
    const userString = localStorage.getItem('userInfo');

    if (userString != null) {
      const user = JSON.parse(userString) as userInfoI;
      console.log(user);
      navigate('/chats');
    }
  }, [navigate]);
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
                <Login />
              </TabPanel>
              <TabPanel>
                <Signup />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Container>
    </>
  );
};

export default Homepage;

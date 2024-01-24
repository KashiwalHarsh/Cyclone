import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [show, setShow] = useState<boolean>(false);
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [loading, setLoading] = useState<boolean>();

  const toast = useToast();
  const navigate = useNavigate();

  const handleClick = () => setShow(!show);
  const handleSubmit = async () => {
    setLoading(true);

    if (!email || !password) {
      toast({
        title: 'Please Enter both the fields!',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      setLoading(false);
      return;
    }

    try {
      const config = { headers: { 'Content-type': 'application/json' } };
      const { data } = await axios.post(
        'http://localhost:3000/api/user/login',
        {
          email,
          password,
        },
        config
      );

      toast({
        title: 'Login Successfull!',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });

      localStorage.setItem('userInfo', JSON.stringify(data));
      setLoading(false);
      navigate('/chats');
    } catch (err) {
      console.log(err);
      toast({
        title: 'Invalid Email or Password!',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      setLoading(false);
    }
  };

  return (
    <>
      <VStack spacing="5px">
        <FormControl id="email" isRequired>
          <FormLabel>Email:</FormLabel>
          <Input
            value={email}
            placeholder="Enter your Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>

        <FormControl id="password" isRequired>
          <FormLabel>Password:</FormLabel>
          <InputGroup>
            <Input
              value={password}
              type={show ? 'text' : 'password'}
              placeholder="Enter your Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <Button
          colorScheme="blue"
          width="100%"
          style={{ marginTop: 15 }}
          onClick={handleSubmit}
          isLoading={loading}
        >
          Login
        </Button>

        <Button
          colorScheme="blackAlpha"
          width="100%"
          style={{ marginTop: 15 }}
          onClick={() => {
            setEmail('guest001@gmail.com');
            setPassword('guest001');
          }}
        >
          Continue with Guest User Credentials
        </Button>
      </VStack>
    </>
  );
};

export default Login;

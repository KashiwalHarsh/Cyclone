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

const Signup = () => {
  const [show, setShow] = useState<boolean>(false);
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [confirmPassword, setConfirmPassword] = useState<string>();
  const [pic, setPic] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  const toast = useToast();

  const handleClick = () => setShow(!show);

  const postDetails = (pics: File) => {
    setLoading(true);
    if (pics === undefined) {
      toast({
        title: 'Please Select an Image!',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      setLoading(false);
      return;
    }

    if (pics.type === 'image/jpeg' || pics.type === 'image/png') {
      const data = new FormData();
      data.append('file', pics);
      data.append('upload_preset', 'Chat-app');
      data.append('cloud_name', 'harshonline');

      fetch('https://api.cloudinary.com/v1_1/harshonline/image/upload', {
        method: 'post',
        mode: 'cors',
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        body: data,
      })
        .then((res) => {
          console.log(res);
          res.json();
        })
        .then((data) => {
          setPic(data.url.toString());
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      toast({
        title: 'Please Select an Image!',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      setLoading(false);
      return;
    }
  };

  const handleSubmit = () => {};

  return (
    <>
      <VStack spacing="5px">
        <FormControl id="name" isRequired>
          <FormLabel>Name:</FormLabel>
          <Input
            value={name}
            placeholder="Enter your Name"
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>
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

        <FormControl id="confirm-password" isRequired>
          <FormLabel>Confirm Password:</FormLabel>
          <InputGroup>
            <Input
              value={confirmPassword}
              type={show ? 'text' : 'password'}
              placeholder="Confirm your Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <FormControl id="pic">
          <FormLabel>Profile Pic:</FormLabel>
          <Input
            value={pic}
            type="file"
            p="1.5"
            accept="image/*"
            onChange={(e) => {
              if (!e.target.files) return;
              postDetails(e.target.files[0]);
            }}
          />
        </FormControl>

        <Button
          colorScheme="green"
          width="100%"
          style={{ marginTop: 15 }}
          onClick={handleSubmit}
          isLoading={loading}
        >
          Signup
        </Button>
      </VStack>
    </>
  );
};

export default Signup;

import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue, useToast,
} from '@chakra-ui/react';
import {Link, useNavigate} from "react-router-dom";
import {useContext, useState} from "react";
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../firebase.tsx";
import { AppUserContext } from '../providers/AppUserProvider.tsx';

const Login = ()  => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const toast = useToast();
    const navigate = useNavigate();
    const {updateUser} = useContext(AppUserContext);

    const handleSignIn = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCred) => {
                toast({
                    title: 'Authentication successful',
                    status: 'success',
                    isClosable: false
                });

                updateUser? updateUser(userCred.user) : null;
                navigate('/');
            })
            .catch((error) => {
                toast({
                    title: 'Registration failed',
                    description: error.message,
                    status: 'error',
                    isClosable: false
                });
            });
    }

    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'}>Sign in to your account</Heading>
                    <Text fontSize={'lg'} color={'gray.600'}>
                        to enjoy all of our cool features ✌️
                    </Text>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                    <Stack spacing={4}>
                        <FormControl id="email">
                            <FormLabel>Email address</FormLabel>
                            <Input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </FormControl>
                        <FormControl id="password">
                            <FormLabel>Password</FormLabel>
                            <Input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </FormControl>
                        <Stack spacing={10}>
                            <Button
                                bg={'blue.400'}
                                color={'white'}
                                _hover={{
                                    bg: 'blue.500',
                                }}
                                onClick={handleSignIn}
                            >
                                Sign in
                            </Button>
                            <Text align={'center'}>
                                Don't have an account? <Link to={"/register"}>Register</Link>
                            </Text>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
};

export default Login;
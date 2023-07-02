import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue, useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {Link, useNavigate} from "react-router-dom";
import {createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import {auth} from "../firebase.tsx";

type RegisterUserType = {
    firstName: string,
    lastName?: string,
    email: string,
    password: string
};

const initialState : RegisterUserType = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
};

const Register = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [formState, setFormState] =useState<RegisterUserType>(initialState);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const toast = useToast();
    const navigate  = useNavigate();


    const handleRegister = () => {
        setIsSubmitting(true);
        createUserWithEmailAndPassword(auth, formState.email, formState.password)
            .then(async (userCred) => {
                console.log(userCred);
                toast({
                    title: 'Registration successful',
                    status: 'success'
                })
                await updateProfile(userCred.user, {
                    displayName: `${formState.firstName} ${formState.lastName}`
                });
                navigate('/');
            })
            .catch((error) => {
                toast({
                    title: 'Registration failed',
                    status: 'error',
                    description: error.message
                })
                console.log(error);
            });

        //TODO: remove this after testing
        setTimeout(() => {
            setIsSubmitting(false);
        }, 1000);

    }

    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'} textAlign={'center'}>
                        Sign up
                    </Heading>
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
                        <HStack>
                            <Box>
                                <FormControl id="firstName" isRequired>
                                    <FormLabel>First Name</FormLabel>
                                    <Input
                                        type="text"
                                        value={formState.firstName}
                                        onChange={(e) =>setFormState(prevState => ({...prevState, firstName: e.target.value}))}
                                    />
                                </FormControl>
                            </Box>
                            <Box>
                                <FormControl id="lastName">
                                    <FormLabel>Last Name</FormLabel>
                                    <Input
                                        type="text"
                                        value={formState.lastName}
                                        onChange={(e) => setFormState(prevState => ({...prevState, lastName: e.target.value}))}
                                    />
                                </FormControl>
                            </Box>
                        </HStack>
                        <FormControl id="email" isRequired>
                            <FormLabel>Email address</FormLabel>
                            <Input
                                type="email"
                                value={formState.email}
                                onChange={(e) => setFormState(prevState => ({...prevState, email:e.target.value}))}
                            />
                        </FormControl>
                        <FormControl id="password" isRequired>
                            <FormLabel>Password</FormLabel>
                            <InputGroup>
                                <Input
                                    type={showPassword ? 'text' : 'password'}
                                    value={formState.password}
                                    onChange={(e) => setFormState(prevState => ({...prevState, password: e.target.value}))}
                                />
                                <InputRightElement h={'full'}>
                                    <Button
                                        variant={'ghost'}
                                        onClick={() =>
                                            setShowPassword((showPassword) => !showPassword)
                                        }>
                                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                        <Stack spacing={10} pt={2}>
                            <Button
                                loadingText={'Registering'}
                                isLoading={isSubmitting}
                                spinnerPlacement={'start'}
                                size="lg"
                                bg={'blue.400'}
                                color={'white'}
                                _hover={{
                                    bg: 'blue.500',
                                }}
                                onClick={handleRegister}
                            >
                                Register
                            </Button>
                        </Stack>
                        <Stack pt={6}>
                            <Text align={'center'}>
                                Already a user? <Link to={"/login"}>Login</Link>
                            </Text>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
};

export default Register;
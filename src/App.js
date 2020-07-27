import React from 'react';
import {
    ThemeProvider,
    theme,
    ColorModeProvider,
    CSSReset,
    Flex,
    Box,
    IconButton,
    useColorMode,
    Heading,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Checkbox,
    Link,
    Button,
    Image,
} from '@chakra-ui/core';
import axios from 'axios'

const VARIANT_COLOR = 'teal'

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <ColorModeProvider>
                <CSSReset />
                <Stack isInline>
                    <HeaderLogo />
                    <LoginArea />
                </Stack>
            </ColorModeProvider>
        </ThemeProvider>
    )
}

const HeaderLogo = () => {
    return (
        <Flex w="200%" >
            <Image src='https://media-exp1.licdn.com/dms/image/C561BAQF5KfkgQaFO6A/company-background_10000/0?e=2159024400&v=beta&t=-LCnlXJWm8acCVDYD1aCJtGs20muEEcGY17rliSds-E' />
        </Flex>
    )
}

const LoginArea = () => {
    return (
        <Flex minHeight='100vh' width='full' align='center' justifyContent='center'>
            <Box
                borderWidth={1}
                px={4}
                width='full'
                maxWidth='500px'
                borderRadius={10}
                textAlign='center'
                boxShadow='lg'
            >
                <ThemeSelector />
                <Box p={5}>
                    <LoginHeader />
                    <LoginForm />
                </Box>
            </Box>
        </Flex>
    )
}

const ThemeSelector = () => {
    const { colorMode, toggleColorMode } = useColorMode()

    return (
        <Box textAlign='right' py={4}>
            <IconButton icon={colorMode === 'light' ? 'moon' : 'sun'}
                onClick={toggleColorMode}
                variant='ghost'
            />
        </Box>
    )
}

const LoginHeader = () => {
    return (
        <Box>
            <Heading>Sign In to Your Account</Heading>
        </Box>
    )
}

const LoginForm = () => {
    return (
        <Box my={8} textAlign='left'>
            <form onSubmit={(event) => login(event)}>
                <FormControl>
                    <FormLabel for="InputEmail">Email address</FormLabel>
                    <Input type='email' placeholder='Enter your email address' id="InputEmail" />
                </FormControl>

                <FormControl mt={4}>
                    <FormLabel for="InputPassword">Password</FormLabel>
                    <Input type='password' placeholder='Enter your password' id="InputPassword" />
                </FormControl>

                <Stack isInline justifyContent='space-between' mt={3}>
                    <Box>
                        <Checkbox>Remember Me</Checkbox>
                    </Box>
                    <Box>
                        <Link color={`${VARIANT_COLOR}.500`}>Forgot your password?</Link>
                    </Box>
                </Stack>

                <Button type='submit' variantColor={VARIANT_COLOR} width='full'
                    mt={4}>Sign In</Button>
            </form>
        </Box>
    )
}

const login = (event) => {   
    event.preventDefault();
    let request = {
        email: document.getElementById('InputEmail').value,
        password: document.getElementById('InputPassword').value
    }
    axios.post('http://localhost:9000/login', request)
        .then(resp => {
            if (resp.data.status){
             return   
            }
           alert(resp.data.message);
        })
         .catch(err => {
             console.log(err);
         })
}

export default App

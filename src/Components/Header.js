import { Stack, StackDivider, Box, Flex, Heading, Link, Menu, MenuButton, MenuItem, MenuList, Button, useMediaQuery } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import React from "react";
import { useNavigate } from "react-router-dom";

function Header() {
    const navigate = useNavigate();
    const [isLargerThan700] = useMediaQuery("(min-width: 700px)");
   


    const menuItemStyles = {
        _focus: { outline: 'none' },
        _active: { bg: 'transparent' },
        _hover: { bg: 'transparent' },
        justifyContent: 'center',
        color: 'black'
    }

    const menu = (
        <Menu>
            <MenuButton 
                as={Button} 
                rightIcon={<HamburgerIcon boxSize="24px"/>} 
                color="blue.200" 
                size="lg" 
                background="transparent"
                _focus={{ outline: 'none'}}
                _active={{ bg: 'transparent' }}
                _hover={{ bg: 'transparent' }}
            />
            <MenuList>
                <Stack divider={<StackDivider borderColor="gray.300" />}>
                    <MenuItem onClick={() => navigate('/')} {...menuItemStyles}>Home</MenuItem>
                    <MenuItem onClick={() => navigate('/recipes')} {...menuItemStyles}>Recipes</MenuItem>
                    <MenuItem onClick={() => navigate('/history')} {...menuItemStyles}>Recipe History</MenuItem>
                    <MenuItem onClick={() => navigate('/recipe-select')} {...menuItemStyles}>Build your Week</MenuItem>
                    <MenuItem onClick={() => navigate('/grocery-list')} {...menuItemStyles}>Grocery List</MenuItem>
                </Stack>
            </MenuList>
        </Menu>
    );

    const links = (
        <Box mt="5px" display="flex">
            <Link href="/" mr={5} fontSize="xl" p={2} borderRadius="md" _hover={{ textDecoration: 'none', boxShadow: '0 0 0 1px white' }}>
                Home
            </Link>
            <Link href="/recipes" mr={5} fontSize="xl" p={2} borderRadius="md" _hover={{ textDecoration: 'none', boxShadow: '0 0 0 1px white' }}>
                Recipes
            </Link>
            <Link href="/history" mr={5} fontSize="xl" p={2} borderRadius="md" _hover={{ textDecoration: 'none', boxShadow: '0 0 0 1px white' }}>
                Recipe History
            </Link>
            <Link href="/recipe-select" mr={5} fontSize="xl" p={2} borderRadius="md" _hover={{ textDecoration: 'none', boxShadow: '0 0 0 1px white' }}>
                Build your Week
            </Link>
            <Link href="/grocery-list" mr={5} fontSize="xl" p={2} borderRadius="md" _hover={{ textDecoration: 'none', boxShadow: '0 0 0 1px white' }}>
                Grocery List
            </Link>
        </Box>
    );

    return (
        <Box bg="purple.400" w="100%" p={4} color="white">
            <Flex justify="space-between">
                <Heading style={{ cursor: 'default' }} onClick={() => navigate('/')}>
                    Johno's Recipes
                </Heading>
                {isLargerThan700 ? links : menu}
            </Flex>
        </Box>
    );
}

export default Header;

import { Button, SimpleGrid, Text,Link } from "@chakra-ui/react";


const Menu = () => {
    return (
        <>
        <Text>MENU</Text>
        <SimpleGrid columns={2} spacing={2} >
            <Link href="/racing"><Button colorScheme="blue" >Racing</Button></Link>
            <Button colorScheme="blue" >Racing</Button>
            <Button colorScheme="blue" >Racing</Button>
            <Button colorScheme="blue" >Racing</Button>
        </SimpleGrid>
        </>
    );
};

export default Menu;
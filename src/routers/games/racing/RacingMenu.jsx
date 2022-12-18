import { Box, Center, HStack, Text, VStack, Link } from "@chakra-ui/react";
import FileUpload from "../../../components/FileUpload";

export const RacingMenu = () => {
    return (
        <VStack >
            <Box>
                <Center><Text fontSize={65}>Så Skal der ræses!</Text></Center>
            </Box>
            <Box>
                <HStack>
                    <Text>vælg en GPX fil</Text>
                </HStack>
                <Link href="/racing/game">START</Link>
            </Box>
        </VStack>
    )
};
import { Box, Flex, useColorModeValue, Stack } from "@chakra-ui/react";

const Navbar = () => {
  return (
    <Box bg={useColorModeValue("gray.100", "#0f0d18")} px={4}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <Box fontWeight="600">CrewCode</Box>

        <Flex alignItems={"center"}>
          <Stack direction={"row"} spacing={7}></Stack>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;

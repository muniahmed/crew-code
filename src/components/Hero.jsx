import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Input,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import HeroImage from "./HeroImage";

const Hero = () => {
  const toast = useToast();
  const [roomName, setRoomName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const enterRoom = async () => {
    if (!roomName) {
      toast({
        title: "Room name required",
        description: "Please enter a room name before proceeding.",
        status: "warning",
        duration: 6000,
      });
      return;
    }
    try {
      setIsLoading(true);
      navigate("/editor", { state: { roomName } });
    } catch (error) {
      console.log(error);
      toast({
        title: "An error has occurred.",
        description: error.message || "Unable to open room",
        status: "error",
        duration: 6000,
      });
    } finally {
      //   setIsLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      enterRoom();
    }
  };
  return (
    <Container
      maxW={"7xl"}
      display="flex"
      height="90vh"
      justifyContent="center"
      alignItems="center"
    >
      <HStack spacing="200px">
        <VStack align={"start"} spacing="10px">
          <Heading as="h1" size="4xl" fontWeight="900">
            Connect. Collaborate.{" "}
            <Text bgGradient="linear(to-r, #1AC2B1, #B2D765)" bgClip="text">
              Code.
            </Text>
          </Heading>
          <Text fontSize="2xl" fontWeight="100">
            Make rooms and code with colleagues in seconds!
          </Text>
          <HStack spacing={0}>
            <Input
              w={250}
              value={roomName}
              onChange={(e) => {
                setRoomName(e.target.value);
              }}
              onKeyDown={handleKeyDown}
              placeholder="Enter a room name"
              variant="fill"
              bgColor={"#fff"}
              _placeholder={{ color: "gray.500" }}
              color="#1A202C"
              borderRightRadius="0"
            />
            <Button
              color="#000"
              colorScheme="green"
              bgGradient="linear(to-r, #1AC2B1, #B2D765)"
              onClick={enterRoom}
              isLoading={isLoading}
              borderLeftRadius="0"
            >
              Get Started Now!
            </Button>
          </HStack>
        </VStack>
        <Box
          position="relative"
          h="300px"
          w="full"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box
            position="absolute"
            h={800}
            w={800}
            bg="radial-gradient(circle,  #B2D765, #5fd4c8, transparent 60%)"
            filter="blur(80px)"
            borderRadius="full"
          />
          <HeroImage />
        </Box>
      </HStack>
    </Container>
  );
};

export default Hero;

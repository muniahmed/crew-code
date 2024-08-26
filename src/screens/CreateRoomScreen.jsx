import { Button, Center, Input, useToast, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateRoomScreen = () => {
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
    <Center h="100vh" w="100vw">
      <VStack spacing={5}>
        <Input
          w={250}
          value={roomName}
          onChange={(e) => {
            setRoomName(e.target.value);
          }}
          onKeyDown={handleKeyDown}
          placeholder="Please enter the room name:"
        />
        <Button colorScheme="green" onClick={enterRoom} isLoading={isLoading}>
          Enter
        </Button>
      </VStack>
    </Center>
  );
};

export default CreateRoomScreen;

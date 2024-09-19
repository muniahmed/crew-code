import { Box } from "@chakra-ui/react";
import { useEffect } from "react";
import Hero from "../components/Hero";

const HomeScreen = () => {
  useEffect(() => {
    const wakeServer = async () => {
      try {
        await fetch("https://crew-code-signaling-server.onrender.com/health");
      } catch (error) {
        console.error("Failed to wake up signaling server:", error);
      }
    };
    wakeServer();
  });

  return (
    <Box>
      <Hero />
    </Box>
  );
};

export default HomeScreen;

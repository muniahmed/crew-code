import { Box, Button, Text, useToast } from "@chakra-ui/react";
import { executeCode } from "../api";
import { useState } from "react";

// eslint-disable-next-line no-unused-vars
const Output = ({ editorRef, language }) => {
  const toast = useToast();
  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;
    try {
      setIsLoading(true);
      const { run: result } = await executeCode(language, sourceCode);
      setOutput(result.output.split("\n"));
      result.stderr ? setIsError(true) : setIsError(false);
    } catch (error) {
      console.log(error);
      toast({
        title: "An error has occurred.",
        description: error.message || "Unable to run code",
        status: "error",
        duration: 6000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      w={{ base: "100%", md: "50%" }}
      h={{ base: "25vh", md: "75vh" }}
      display="inline-block"
    >
      <Text mb={2} fontSize="lg">
        Output
      </Text>
      <Button
        variant="outline"
        colorScheme="green"
        mb={4}
        onClick={runCode}
        isLoading={isLoading}
      >
        Run Code
      </Button>
      <Box
        height="100%"
        p={2}
        border="1px solid"
        borderRadius={4}
        borderColor={isError ? "red.500" : "#333"}
        color={isError ? "red.400" : ""}
        overflowY="auto"
      >
        {output
          ? output.map((line, i) => <Text key={i}>{line}</Text>)
          : 'Click "Run Code" to see the output here'}
      </Box>
    </Box>
  );
};

export default Output;

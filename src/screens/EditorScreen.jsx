import { Box } from "@chakra-ui/react";
import CodeEditor from "../components/CodeEditor";

const EditorScreen = () => {
  return (
    <Box px={6} py={8}>
      <CodeEditor />
    </Box>
  );
};

export default EditorScreen;

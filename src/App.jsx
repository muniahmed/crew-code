import { Box } from "@chakra-ui/react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import CreateRoomScreen from "./screens/CreateRoomScreen";
import EditorScreen from "./screens/EditorScreen";

function App() {
  return (
    <BrowserRouter>
      <Box minH="100vh" bg="#110e1b">
        <Routes>
          <Route exact path="/" element={<CreateRoomScreen />} />
          <Route path="editor" element={<EditorScreen />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Box>
    </BrowserRouter>
  );
}

export default App;

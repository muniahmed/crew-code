import { Box } from "@chakra-ui/react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import EditorScreen from "./screens/EditorScreen";
import HomeScreen from "./screens/HomeScreen";

function App() {
  return (
    <BrowserRouter>
      <Box minH="100vh" bg="#110e1b">
        <Routes>
          <Route exact path="/" element={<HomeScreen />} />
          <Route path="editor" element={<EditorScreen />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Box>
    </BrowserRouter>
  );
}

export default App;

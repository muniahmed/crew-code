import { Box, HStack, Text } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import { useEffect, useRef, useState } from "react";
import LanguageSelector from "./LanguageSelector";
import { CODE_SNIPPETS } from "../constants";
import Output from "./Output";
import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";
import { MonacoBinding } from "y-monaco";
import { useLocation } from "react-router-dom";

const CodeEditor = () => {
  const editorRef = useRef();
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [sharedLanguage, setSharedLanguage] = useState(null);
  const [users, setUsers] = useState(0);
  const location = useLocation();
  const { roomName } = location.state || {};

  const onMount = (editor) => {
    const doc = new Y.Doc();

    const provider = new WebrtcProvider(roomName, doc);
    const codeEditorType = doc.getText("monaco");
    const languageType = doc.getText("programming-language");

    editorRef.current = editor;

    // eslint-disable-next-line no-unused-vars
    const binding = new MonacoBinding(
      codeEditorType,
      editorRef.current.getModel(),
      new Set([editorRef.current]),
      provider.awareness
    );

    const awareness = provider.awareness;

    // eslint-disable-next-line no-unused-vars
    awareness.on("change", (changes, origin) => {
      const userCount = awareness.getStates().size;
      setUsers(userCount);
    });

    setLanguage(languageType.toString());

    languageType.observe(() => {
      setLanguage(languageType.toString());
    });

    setSharedLanguage(languageType);

    editor.focus();
  };

  useEffect(() => {
    if (sharedLanguage) {
      const currentLanguage = sharedLanguage.toString();
      if (currentLanguage !== language) {
        sharedLanguage.delete(0, sharedLanguage.length);
        sharedLanguage.insert(0, language);
      }
    }
  }, [language, sharedLanguage]);

  const onSelect = (language) => {
    setLanguage(language);
    setValue(CODE_SNIPPETS[language]);
  };

  return (
    <Box>
      <HStack spacing={4}>
        <Box w="50%">
          <Text>Room Name: {roomName}</Text>
          <Text>{`Users in Room: ${users}`}</Text>
          <LanguageSelector language={language} onSelect={onSelect} />
          <Editor
            height="75vh"
            theme="vs-dark"
            language={language}
            defaultValue={CODE_SNIPPETS[language]}
            onMount={onMount}
            value={value}
            onChange={(value) => setValue(value)}
          />
        </Box>
        <Output editorRef={editorRef} language={language} />
      </HStack>
    </Box>
  );
};

export default CodeEditor;

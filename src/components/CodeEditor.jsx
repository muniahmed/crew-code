import { Box, Button, HStack, Text, VStack } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import { useEffect, useRef, useState } from "react";
import LanguageSelector from "./LanguageSelector";
import { CODE_SNIPPETS, LANGUAGE_VERSIONS } from "../constants";
import Output from "./Output";
import * as Y from "yjs";
import { WebrtcProvider } from "y-webrtc";
import { MonacoBinding } from "y-monaco";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchLanguageVersions } from "../api";
import InactiveTooltip from "./InactiveTooltip";

const CodeEditor = () => {
  const editorRef = useRef();
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [sharedLanguage, setSharedLanguage] = useState(null);
  const [isServerActive, setIsServerActive] = useState(false);
  const [users, setUsers] = useState(0);
  const location = useLocation();
  const { roomName } = location.state || {};
  const navigate = useNavigate();
  const docRef = useRef(null);
  const providerRef = useRef(null);

  const onMount = (editor) => {
    const doc = new Y.Doc();

    const provider = new WebrtcProvider(roomName, doc, {
      signaling: ["wss://crew-code-signaling-server.onrender.com"],
    });

    docRef.current = doc;
    providerRef.current = provider;

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

    awareness.on("change", () => {
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
    const updateLanguageVersions = async () => {
      const fetchedVersions = await fetchLanguageVersions();
      if (fetchedVersions) {
        Object.assign(LANGUAGE_VERSIONS, fetchedVersions);
      }
    };

    updateLanguageVersions();
  }, []);
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

  const handleBackClick = () => {
    navigate("/");
  };

  useEffect(() => {
    const checkServerStatus = async () => {
      try {
        const response = await fetch(
          "https://crew-code-signaling-server.onrender.com/health"
        );
        if (response.ok) {
          setIsServerActive(true);
        } else {
          setIsServerActive(false);
        }
      } catch (error) {
        setIsServerActive(false);
      }
    };

    checkServerStatus();

    const interval = setInterval(checkServerStatus, 10000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    return () => {
      if (docRef.current) {
        docRef.current.destroy();
      }
      if (providerRef.current) {
        providerRef.current.destroy();
      }
    };
  }, []);

  return (
    <Box>
      <HStack spacing={4}>
        <Box w="50%">
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

      <HStack justify="space-between" w="100%" mt={4}>
        <HStack align="center">
          <InactiveTooltip />
          <Text>Server Status: </Text>
          <Box
            w="12px"
            h="12px"
            bg={isServerActive ? "green.500" : "red.500"}
            borderRadius="50%"
          />
        </HStack>
        <VStack>
          <Text>Room: {roomName}</Text>
          <Text>{`Contributors: ${users}`}</Text>
        </VStack>
        <Button colorScheme="blue" onClick={handleBackClick}>
          Back
        </Button>
      </HStack>
    </Box>
  );
};

export default CodeEditor;

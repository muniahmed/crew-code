import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import MonacoEditor from "@monaco-editor/react";
import Chat from "../components/Chat";

const EditorPage = () => {
  const { id } = useParams();
  const [socket, setSocket] = useState(null);
  const editorRef = useRef(null);

  useEffect(() => {
    const socket = io("http://localhost:3001");
    setSocket(socket);

    socket.on("code-update", (data) => {
      if (editorRef.current) {
        editorRef.current.setValue(data);
      }
    });

    return () => socket.disconnect();
  }, []);

  const handleEditorChange = (value) => {
    if (socket) {
      socket.emit("code-change", value);
    }
  };

  return (
    <div>
      <MonacoEditor
        height="90vh"
        defaultLanguage="javascript"
        onChange={handleEditorChange}
        editorDidMount={(editor) => (editorRef.current = editor)}
      />
      <Chat socket={socket} />
    </div>
  );
};

export default EditorPage;

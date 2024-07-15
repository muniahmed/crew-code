import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import MonacoEditor from "@monaco-editor/react";
import Chat from "../../components/Chat/Chat";
import axios from "axios";
import "./EditorPage.css";

const EditorPage = () => {
  const { id } = useParams();
  const [socket, setSocket] = useState(null);
  const [output, setOutput] = useState("");
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

  const compileCode = async () => {
    if (editorRef.current) {
      const code = editorRef.current.getValue();
      try {
        const response = await axios.post("http://localhost:3001/compile", {
          code,
        });
        setOutput(response.data.output);
      } catch (error) {
        setOutput(error.response.data.error);
      }
    }
  };

  return (
    <div className="editor-page-container">
      <div className="editor-container">
        <div
          style={{ margin: "20px", padding: "20px", border: "1px solid #ccc" }}
        >
          <MonacoEditor
            height="55vh"
            defaultLanguage="javascript"
            onChange={handleEditorChange}
            onMount={(editor) => (editorRef.current = editor)}
          />
          <button onClick={compileCode}>Run Code</button>
        </div>

        <div className="output">
          <h3>Output:</h3>
          <pre>{output}</pre>
        </div>
      </div>
      <Chat socket={socket} />
    </div>
  );
};

export default EditorPage;

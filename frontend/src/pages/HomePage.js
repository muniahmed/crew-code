import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to CrewCode</h1>
      <Link to="/editor/1">Go to Editor</Link>
    </div>
  );
};

export default HomePage;

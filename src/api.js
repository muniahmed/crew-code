import axios from "axios";
import { LANGUAGE_VERSIONS } from "./constants";

const API = axios.create({
  baseURL: "https://emkc.org/api/v2/piston",
});

export const fetchLanguageVersions = async () => {
  try {
    const response = await fetch("https://emkc.org/api/v2/piston/runtimes");
    const data = await response.json();

    const desiredLanguages = Object.keys(LANGUAGE_VERSIONS);

    const filteredData = data.filter((runtime) =>
      desiredLanguages.includes(runtime.language)
    );

    const languageVersions = {};
    filteredData.forEach((runtime) => {
      languageVersions[runtime.language] = runtime.version;
    });

    return languageVersions;
  } catch (error) {
    console.error("Error fetching language versions:", error);
    return LANGUAGE_VERSIONS;
  }
};

export const executeCode = async (language, sourceCode) => {
  const response = await API.post("/execute", {
    language: language,
    version: LANGUAGE_VERSIONS[language],
    files: [
      {
        content: sourceCode,
      },
    ],
  });

  return response.data;
};

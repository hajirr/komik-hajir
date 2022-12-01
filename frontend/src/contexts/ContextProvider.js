import React, { createContext, useContext, useState } from "react";
const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  const [urlDetailKomik, setUrlDetailKomik] = useState("");
  const [urlChapterKomik, setUrlChapterKomik] = useState("");

  return (
    <StateContext.Provider
      value={{
        urlDetailKomik,
        setUrlDetailKomik,
        urlChapterKomik,
        setUrlChapterKomik,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);

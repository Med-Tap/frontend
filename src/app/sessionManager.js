// context/AppContext.js
"use client";
import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

export function AppWrapper({ children }) {
  const [sessionID, setSessionID] = useState(null);

  const [user, setUser] = useState(null);
  const [hashID, setHashID] = useState(null);

  useEffect(() => {
    console.log(user, hashID);
  }, []);

  return (
    <AppContext.Provider
      value={{ sessionID, setSessionID, user, setUser, hashID, setHashID }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default function useAppContext() {
  return useContext(AppContext);
}

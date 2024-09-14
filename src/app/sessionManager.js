// context/AppContext.js
"use client"
import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export function AppWrapper({ children }) {
  const [sessionID, setSessionID] = useState(null);

  // You can store other global states here too
  const [user, setUser] = useState(null);

  return (
    <AppContext.Provider value={{ sessionID, setSessionID, user, setUser }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}

import { createContext, useState } from "react";

export const LoadContext = createContext(null);

export const LoadProvider = ({ children }) => {
  const [loadSpinner, setLoadSpinner] = useState(false);

  return (
    <LoadContext.Provider
      value={{
        loadSpinner,
        setLoadSpinner: (load) => setLoadSpinner(load),
      }}
    >
      {children}
    </LoadContext.Provider>
  );
};

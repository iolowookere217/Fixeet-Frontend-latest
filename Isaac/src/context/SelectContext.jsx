import { createContext, useEffect, useState } from "react";

export const SelectContext = createContext(null);

export const SelectContextProvider = ({ children }) => {
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (selected) {
      console.log(selected, "selected");
    }
  }, [selected]);

  return (
    <SelectContext.Provider
      value={{
        selected,
        setSelected,
      }}
    >
      {children}
    </SelectContext.Provider>
  );
};

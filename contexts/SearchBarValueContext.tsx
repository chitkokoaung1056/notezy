import React, { createContext, ReactNode, useState } from "react";

// Define context type
interface SearchBarContextType {
  searchBarValue: string;
  updateSearchBarValue: (value: string) => void;
}

export const SearchBarValueContext = createContext<SearchBarContextType>({
  searchBarValue: "",
  updateSearchBarValue: () => {},
});

export const SearchBarValueProvider = ({ children }: { children: ReactNode }) => {
  const [searchBarValue, setSearchBarValue] = useState("");

  const updateSearchBarValue = (value: string) => setSearchBarValue(value);

  return (
    <SearchBarValueContext
      value={{ searchBarValue, updateSearchBarValue }}
    >
      {children}
    </SearchBarValueContext>
  );
};

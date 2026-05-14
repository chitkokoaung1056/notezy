import { SearchBarValueContext } from "@/contexts/SearchBarValueContext";
import { useContext } from "react";

const useSearchBar = () => {
  const context = useContext(SearchBarValueContext);
  if (!context) {
    throw new Error(
      "useSearchBar must be used within a SearchBarValueProvider"
    );
  }
  return context;
};

export default useSearchBar;
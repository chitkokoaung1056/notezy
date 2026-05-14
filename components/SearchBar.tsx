import useSearchBar from "@/hooks/useSearchBar";
import { useTheme } from "@/hooks/useTheme";
import AntDesign from "@expo/vector-icons/AntDesign";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import React, { useState } from "react";
import { Platform, TextInput, View } from "react-native";

const SearchBar = () => {
  const { theme } = useTheme();
  const { searchBarValue, updateSearchBarValue } = useSearchBar();
  const [focused, setFocused] = useState(false);
  const resetSearchValue = () => updateSearchBarValue("");

  return (
    <View
      className={`fixed -top-2 left-0 right-0 z-10 rounded-xl border-2 flex-row items-center px-4 py-0
        bg-white dark:bg-slate-700
        ${focused ? (theme === "dark" ? "border-blue-300" : "border-blue-500") : "border-transparent"}
      `}
      style={
        Platform.OS === "android"
          ? { elevation: 2 }
          : {
              shadowColor: "#000",
              shadowOpacity: 0.15,
              shadowRadius: 6,
              shadowOffset: { width: 0, height: 3 },
            }
      }>
      <EvilIcons
        name="search"
        size={26}
        color={theme === "light" ? "#6b7280" : "#e5e7eb"}
      />

      <TextInput
        placeholder="Search notes..."
        onFocus={() => setFocused(true)}
        onChangeText={(searchBarValue) => updateSearchBarValue(searchBarValue)}
        value={searchBarValue}
        onBlur={() => setFocused(false)}
        className="mx-2 flex-1 text-base text-black dark:text-white dark:placeholder:text-slate-300"
      />

      {searchBarValue.length > 0 && (
        <AntDesign
          name="close"
          size={16}
          color={theme === "light" ? "#6b7280" : "#e5e7eb"}
          onPress={resetSearchValue}
        />
      )}
    </View>
  );
};

export default SearchBar;

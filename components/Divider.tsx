import React from "react";
import { View } from "react-native";

interface DividerProps {
  height?: number;
  width?: number | string;
}

const Divider = ({ height = 1, width = "100%" }: DividerProps) => {
  return (
    <View
      className="bg-gray-400 my-3"
      style={{
        height,
        width,
      }}
    />
  );
};

export default Divider;
